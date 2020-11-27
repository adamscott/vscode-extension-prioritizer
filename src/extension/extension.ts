import {
  window,
  CancellationToken,
  ExtensionContext,
  SnippetString,
  Uri,
  Webview,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext
} from 'vscode'

import { ExtensionPrioritizerMessage } from '@/common'

export function activate (context: ExtensionContext): void {
  console.log('Congratulations, your extension "extension-prioritizer" is now active!')

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

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview)

    webviewView.webview.onDidReceiveMessage(async (data: ExtensionPrioritizerMessage) => {
      switch (data.type) {
        case 'echo':
        {
          await window.activeTextEditor?.insertSnippet(new SnippetString(`#${data.value}`))
          break
        }
      }
    })
  }

  private _getHtmlForWebview (webview: Webview): string {
    // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
    const scriptUri = webview.asWebviewUri(Uri.joinPath(this._extensionUri, 'dist', 'view', 'view.js'))

    // Do the same for the stylesheet.
    const styleResetUri = webview.asWebviewUri(Uri.joinPath(this._extensionUri, 'media', 'reset.css'))
    const styleVSCodeUri = webview.asWebviewUri(Uri.joinPath(this._extensionUri, 'media', 'vscode.css'))
    const styleMainUri = webview.asWebviewUri(Uri.joinPath(this._extensionUri, 'media', 'main.css'))

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce()

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <!--
          Use a content security policy to only allow loading images from https or from our extension directory,
          and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${styleResetUri.toString()}" rel="stylesheet">
        <link href="${styleVSCodeUri.toString()}" rel="stylesheet">
        <link href="${styleMainUri.toString()}" rel="stylesheet">

        <title>Extension Prioritizer</title>
      </head>
      <body>
        <script defer nonce="${nonce}" src="${scriptUri.toString()}"></script>
        <div id="app"></div>
      </body>
    </html>`
  }
}

function getNonce (): string {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
