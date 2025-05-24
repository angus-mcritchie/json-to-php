import * as vscode from 'vscode';
import { fromClipboard, fromSelection } from './jsonToPhp';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('json-to-php-code.from-clipboard', fromClipboard));
	context.subscriptions.push(vscode.commands.registerCommand('json-to-php-code.from-selection', fromSelection));
}

// This method is called when your extension is deactivated
export function deactivate() {
	//
}
