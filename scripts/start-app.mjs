import { spawn, spawnSync } from 'node:child_process'
import { access, copyFile, mkdir, readdir } from 'node:fs/promises'
import { constants } from 'node:fs'
import net from 'node:net'
import path from 'node:path'
import process from 'node:process'
import dotenv from 'dotenv'

const rootDir = process.cwd()
const envPath = path.join(rootDir, '.env')
const envExamplePath = path.join(rootDir, '.env.example')

const log = (message) => {
  console.log(`[app] ${message}`)
}

const delay = (milliseconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })

const fileExists = async (filePath) => {
  try {
    await access(filePath, constants.F_OK)
    return true
  } catch {
    return false
  }
}

const ensureEnvFile = async () => {
  const hasEnv = await fileExists(envPath)

  if (hasEnv) {
    return
  }

  const hasEnvExample = await fileExists(envExamplePath)

  if (!hasEnvExample) {
    throw new Error('Missing .env and .env.example files. Cannot continue.')
  }

  await copyFile(envExamplePath, envPath)
  log('Created .env from .env.example')
}

const parseMongoHostAndPort = (mongoUri) => {
  const defaultConfig = {
    host: '127.0.0.1',
    port: 27017,
  }

  if (!mongoUri || typeof mongoUri !== 'string') {
    return defaultConfig
  }

  const withoutProtocol = mongoUri.replace(/^mongodb(\+srv)?:\/\//i, '')
  const withoutAuth = withoutProtocol.includes('@') ? withoutProtocol.split('@')[1] : withoutProtocol
  const hostSegment = withoutAuth.split('/')[0]
  const primaryHost = hostSegment.split(',')[0]
  const [host, portText] = primaryHost.split(':')

  if (!host) {
    return defaultConfig
  }

  const port = Number.parseInt(portText, 10)

  return {
    host,
    port: Number.isFinite(port) ? port : defaultConfig.port,
  }
}

const isLocalMongoUri = (mongoUri) => {
  if (!mongoUri || typeof mongoUri !== 'string') {
    return false
  }

  if (mongoUri.toLowerCase().startsWith('mongodb+srv://')) {
    return false
  }

  const { host } = parseMongoHostAndPort(mongoUri)
  const normalizedHost = host.toLowerCase()

  return ['localhost', '127.0.0.1', '::1'].includes(normalizedHost)
}

const isPortOpen = ({ host, port, timeoutMs = 700 }) =>
  new Promise((resolve) => {
    const socket = new net.Socket()

    const finalize = (result) => {
      socket.removeAllListeners()
      socket.destroy()
      resolve(result)
    }

    socket.setTimeout(timeoutMs)
    socket.once('connect', () => finalize(true))
    socket.once('timeout', () => finalize(false))
    socket.once('error', () => finalize(false))

    socket.connect(port, host)
  })

const waitForMongo = async ({ host, port, maxAttempts = 30, waitMs = 500 }) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const open = await isPortOpen({ host, port })

    if (open) {
      return true
    }

    await delay(waitMs)
  }

  return false
}

const runPowerShell = (command) =>
  spawnSync('powershell.exe', ['-NoProfile', '-Command', command], {
    stdio: 'pipe',
    encoding: 'utf8',
  })

const tryStartMongoWindowsService = () => {
  const result = runPowerShell(
    "$service = Get-Service -Name 'MongoDB' -ErrorAction SilentlyContinue; " +
      "if ($null -eq $service) { exit 2 }; " +
      "if ($service.Status -ne 'Running') { Start-Service -Name 'MongoDB' -ErrorAction Stop }; " +
      'exit 0',
  )

  if (result.status === 0) {
    log('MongoDB service is running')
    return true
  }

  if (result.status === 2) {
    return false
  }

  const details = (result.stderr || result.stdout || 'Unknown service error').trim()
  throw new Error(`Unable to start MongoDB service: ${details}`)
}

const findMongodExecutable = async () => {
  const locatorCommand = process.platform === 'win32' ? 'where' : 'which'
  const locatorResult = spawnSync(locatorCommand, ['mongod'], {
    stdio: 'pipe',
    encoding: 'utf8',
  })

  if (locatorResult.status === 0 && locatorResult.stdout) {
    const candidate = locatorResult.stdout
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find(Boolean)

    if (candidate) {
      return candidate
    }
  }

  if (process.platform !== 'win32') {
    return null
  }

  const mongoRoot = 'C:\\Program Files\\MongoDB\\Server'

  if (!(await fileExists(mongoRoot))) {
    return null
  }

  const versions = await readdir(mongoRoot)
  const sortedVersions = versions.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))

  for (const version of sortedVersions) {
    const candidate = path.join(mongoRoot, version, 'bin', 'mongod.exe')

    if (await fileExists(candidate)) {
      return candidate
    }
  }

  return null
}

const startMongodProcess = async () => {
  const mongodExecutable = await findMongodExecutable()

  if (!mongodExecutable) {
    return false
  }

  const mongoDataPath = 'C:\\data\\db'
  await mkdir(mongoDataPath, { recursive: true })

  const mongodProcess = spawn(mongodExecutable, ['--dbpath', mongoDataPath], {
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
  })

  mongodProcess.unref()
  log(`Started mongod process (${mongodProcess.pid})`)

  return true
}

const ensureMongoRunning = async (mongoUri) => {
  const mongoConfig = parseMongoHostAndPort(mongoUri)
  const alreadyRunning = await isPortOpen(mongoConfig)

  if (alreadyRunning) {
    log('MongoDB is already running')
    return
  }

  if (!isLocalMongoUri(mongoUri)) {
    throw new Error('MongoDB is not reachable and the configured MONGO_URI is not local.')
  }

  if (process.platform === 'win32') {
    let started = false

    try {
      started = tryStartMongoWindowsService()
    } catch (serviceError) {
      log(serviceError.message)
    }

    if (!started) {
      started = await startMongodProcess()
    }

    if (!started) {
      throw new Error(
        'MongoDB is not installed or not available in PATH. Install MongoDB Community Server once, then re-run npm run app.',
      )
    }

    const mongoReady = await waitForMongo(mongoConfig)

    if (!mongoReady) {
      throw new Error('MongoDB did not become ready in time.')
    }

    log('MongoDB is ready')
    return
  }

  throw new Error('Automatic MongoDB startup is currently implemented for Windows only.')
}

const childProcesses = []
let shuttingDown = false

const killProcessTree = (pid) => {
  if (!pid) {
    return
  }

  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/PID', String(pid), '/T', '/F'], {
      stdio: 'ignore',
    })
    return
  }

  try {
    process.kill(pid, 'SIGTERM')
  } catch {
    // Process may already be gone.
  }
}

const shutdown = (exitCode = 0) => {
  if (shuttingDown) {
    return
  }

  shuttingDown = true

  for (const child of childProcesses) {
    killProcessTree(child.pid)
  }

  setTimeout(() => {
    process.exit(exitCode)
  }, 200)
}

const runCommand = (label, args) => {
  log(`Starting ${label}...`)

  const command = process.platform === 'win32' ? 'cmd.exe' : 'npm'
  const commandArgs =
    process.platform === 'win32' ? ['/d', '/s', '/c', `npm ${args.join(' ')}`] : args

  const child = spawn(command, commandArgs, {
    stdio: 'inherit',
    env: process.env,
    shell: false,
  })

  childProcesses.push(child)

  child.on('error', (error) => {
    log(`${label} failed to start: ${error.message}`)
    shutdown(1)
  })

  child.on('exit', (code, signal) => {
    if (shuttingDown) {
      return
    }

    const printableCode = code ?? (signal ? 1 : 0)
    log(`${label} exited`)
    shutdown(printableCode)
  })

  return child
}

process.on('SIGINT', () => shutdown(0))
process.on('SIGTERM', () => shutdown(0))

const start = async () => {
  await ensureEnvFile()

  dotenv.config({ path: envPath })

  const mongoUri = process.env.MONGO_URI ?? ''

  if (!mongoUri) {
    throw new Error('MONGO_URI is missing in .env')
  }

  await ensureMongoRunning(mongoUri)

  runCommand('backend', ['run', 'server'])
  await delay(1200)
  runCommand('frontend', ['run', 'dev'])

  log('All services are starting. Open http://localhost:5173')
}

void start().catch((error) => {
  log(error.message)
  shutdown(1)
})
