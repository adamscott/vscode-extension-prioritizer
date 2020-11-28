import { Uri, window, workspace } from 'vscode'

export const getExtensionPrioritizerConfig = () => {
	return getConfig('extension-prioritizer')
};

function getConfig(section: string, uri?: Uri) {
  let configUri: Uri | null = null

	if (!uri) {
		if (window.activeTextEditor) {
			configUri = window.activeTextEditor.document.uri
		} else {
			configUri = null
		}
	}
	return workspace.getConfiguration(section, configUri)
}
