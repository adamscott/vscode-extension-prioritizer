import type { ExtensionContext } from 'vscode'

import { commands, window } from 'vscode'

export function activate (context: ExtensionContext):void {
  console.log('Congratulations, your extension "extensions-prioritizer" is now active!')

  const disposable = commands.registerCommand('extensions-prioritizer.helloWorld', async () => {
    await window.showInformationMessage('Hello World from Extensions Prioritizer!')
  })

  context.subscriptions.push(disposable)
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate ():void {}
