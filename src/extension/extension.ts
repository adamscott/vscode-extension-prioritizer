import { ExtensionContext, window } from 'vscode'

import { ExtensionPrioritizerViewProvider } from '@extension/view'
import { ExtensionPrioritizerMessage } from '@/common'

export function activate (context: ExtensionContext): void {
  console.log('Congratulations, your extension "extension-prioritizer" is now active!')

  const provider = new ExtensionPrioritizerViewProvider(context.extensionUri)

  provider.onDidReceiveMessage((event: ExtensionPrioritizerMessage) => {
    switch (event.type) {
      case '': {
        console.log('empty string')
        break
      }

      case 'e': {
        console.log('yo')
      }
    }
  })

  context.subscriptions.push(
    window.registerWebviewViewProvider(ExtensionPrioritizerViewProvider.viewType, provider)
  )

  commands.registerCommand('extension-prioritizer.refresh', () => ( console.log('refresh') ))

}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate (): void {}
