import path from 'path'
import { homedir } from 'os'
import { window } from 'vscode'

import { getCodeExec } from './command'
import { getExtensionPrioritizerConfig } from './config'

function getExtensionsDirectory (): string {
  // ps -ww -fp 11935 -o args | head -2 | tail -1

  const config = getExtensionPrioritizerConfig()

  if (config.get('extensionsDir') !== null) {
    const configExtensionsDir = config.get('extensionsDir')
    if (typeof configExtensionsDir === 'string') {
      return configExtensionsDir
    }
  }

  return path.resolve(path.join(homedir(), '.vscode', 'extensions'))
}

export async function getExtensionsList(): Promise<string[]> {
  const list = await getCodeExec(['--extensions-dir', getExtensionsDirectory(), '--list-extensions'])
  if (!list) {
    return ['']
  }

  const splitCharacter = process.platform === 'win32' ? '\r\n' : '\n'
  return list.split(splitCharacter).map((extension) => extension.trim())
}
