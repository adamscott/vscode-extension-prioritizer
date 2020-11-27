import type { ExtensionContext } from 'vscode'

import { commands, window } from 'vscode'

export function activate (context: ExtensionContext):void {
  console.log('Congratulations, your extension "extension-prioritizer" is now active!')

  const disposable = commands.registerCommand('extension-prioritizer.helloWorld', async () => {
    await window.showInformationMessage('Hello World from Extension Prioritizer!')
  })

  context.subscriptions.push(disposable)
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate ():void {}
