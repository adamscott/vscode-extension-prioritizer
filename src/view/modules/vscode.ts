import type { ExtensionPrioritizerMessage } from '@/common'

export interface VsCodeApi {
  getState: () => Record<string, unknown>
  setState: (data: Record<string, unknown>) => void
  postMessage: (msg: ExtensionPrioritizerMessage) => void
}

declare global {
  interface Window {
    acquireVsCodeApi: () => VsCodeApi
  }
}

const vscode: VsCodeApi = window.acquireVsCodeApi()

export const getState = vscode.getState
export const setState = vscode.setState
export const postMessage = vscode.postMessage
