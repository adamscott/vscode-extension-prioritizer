import type { ExtensionPrioritizerMessage } from '@/common'

interface VsCodeApi {
  getState: () => Record<string, unknown>
  setState: (data: Record<string, unknown>) => void
  postMessage: (msg: ExtensionPrioritizerMessage) => void
}

declare global {
  function acquireVsCodeApi (): VsCodeApi
}
