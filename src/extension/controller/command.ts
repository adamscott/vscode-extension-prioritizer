import path from 'path'
import { ExecOptions, exec } from 'child_process'

export async function getExec(executablePath: string, args: string[], options: ExecOptions = {}): Promise<string> {
  const executable:string = `${executablePath} ${args.join(' ')}`.trim();

  options = {
    ...options,
    timeout: options.timeout ?? 2000,
    windowsHide: process.platform === 'win32' ? options.windowsHide ?? true : false
  }

  return new Promise((resolve, reject) => {
    exec(executable, options, (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        console.log(`errcode: ${err.code}`)
        console.log(`errsignal: ${err.signal}`)
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
        reject(err)
      } else {
        resolve(stdout)
      }
    })
  })
}

export async function getCodeExec(args: string[], options: ExecOptions = {}): Promise<string> {
  // from code cli executable script
  // ELECTRON="$VSCODE_PATH/code"
  // CLI="$VSCODE_PATH/resources/app/out/cli.js"
  // ELECTRON_RUN_AS_NODE=1 "$ELECTRON" "$CLI" "$@"

  const electronPath = process.argv0
  const vsCodePath = path.dirname(electronPath)
  const vsCodeCliPath = path.join(vsCodePath, 'resources', 'app', 'out', 'cli.js')

  const executablePath = `"${electronPath}" "${vsCodeCliPath}"`

  if (!options.env) {
    options.env = process.env
  }

  options.env['ELECTRON_RUN_AS_NODE'] = '1'

  return getExec(executablePath, args, options)
}
