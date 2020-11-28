import { ExtensionContext, commands, window } from 'vscode'

import { ExtensionPrioritizerViewProvider } from '@extension/view'
import { ExtensionPrioritizerMessage } from '@/common'

import { getExtensionsList } from './controller/parser'

export function activate (context: ExtensionContext): void {
  console.log('Congratulations, your extension "extension-prioritizer" is now active!')

  const provider = new ExtensionPrioritizerViewProvider(context.extensionUri)

  provider.onDidReceiveMessage(async (event: ExtensionPrioritizerMessage) => {
    switch (event.type) {
      case 'button-click': {
        const extensions = await getExtensionsList()
        window.showInformationMessage(`Extensions: ${extensions.join(', ')}`)
        break
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
