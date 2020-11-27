import type { CancellationToken, ExtensionContext, Uri, WebviewView, WebviewViewProvider, WebviewViewResolveContext } from 'vscode'

import { commands, window } from 'vscode'

export function activate (context: ExtensionContext): void {
  console.log('Congratulations, your extension "extension-prioritizer" is now active!')

  const disposable = commands.registerCommand('extension-prioritizer.show', async () => {
    await window.showInformationMessage('Hello World from Extension Prioritizer!')
  })

  context.subscriptions.push(disposable)

  const provider = new ExtensionPrioritizerViewProvider(context.extensionUri)

  context.subscriptions.push(
    window.registerWebviewViewProvider(ExtensionPrioritizerViewProvider.viewType, provider)
  )
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate (): void {}

class ExtensionPrioritizerViewProvider implements WebviewViewProvider {
  public static readonly viewType = 'extension-prioritizer.view'

  private _view?: WebviewView

  constructor (
    private readonly _extensionUri: Uri
  ) {}

  public resolveWebviewView (
    webviewView: WebviewView,
    context: WebviewViewResolveContext,
    _token: CancellationToken
  ): void {
    this._view = webviewView

    webviewView.webview.options = {
      enableScripts: true,

      localResourceRoots: [
        this._extensionUri
      ]
    }
  }
}
