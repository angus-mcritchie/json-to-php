import * as vscode from 'vscode';
import json2php from 'json2php';

export function fromClipboard(): void {
    vscode.env.clipboard.readText().then(json => jsonToPhp(json));
}

export async function fromSelection(): Promise<void> {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        vscode.window.showErrorMessage('No active text editor found.');
        return;
    }

    const selection = editor.selection;

    if (selection.isEmpty) {
        vscode.window.showErrorMessage('No text selected. Please select JSON text to convert.');
        return;
    }

    const json = editor.document.getText(selection);

    if (!json) {
        vscode.window.showErrorMessage('Selected text is empty.');
        return;
    }

    jsonToPhp(json);
}

function jsonToPhp(json: string): void {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        vscode.window.showErrorMessage('No active text editor found.');

        return;
    }

    let data = null;

    try {
        data = JSON.parse(json);
    } catch (error) {
        vscode.window.showErrorMessage(`Invalid JSON: ${error}`);
        return;
    }

    const position = editor.selection?.active || new vscode.Position(0, 0);
    const indent = editor.options.insertSpaces ? ' '.repeat(editor.options.tabSize as number) : '\t';
    const linebreak = editor.document.eol === vscode.EndOfLine.LF ? '\n' : '\r\n';
    const line = editor.document.lineAt(position.line);
    const firstNonWhitespace = line.firstNonWhitespaceCharacterIndex;
    const indentation = line.text.substring(0, firstNonWhitespace);

    const printer = json2php.make({
        linebreak,
        indent,
        shortArraySyntax: true,
        stripSpaces: false
    });

    let result = printer(data, indentation);

    if (vscode.workspace.getConfiguration('json-to-php-code').get('semicolon', true)) {
        result += ';';
    }

    if (vscode.workspace.getConfiguration('json-to-php-code').get('assign-variable', true)) {
        result = `$${vscode.workspace.getConfiguration('json-to-php-code').get('variable-name', 'result')} = ${result}`;
    }

    result += `${linebreak}${indentation}`;

    editor.edit((editBuilder) => editBuilder.replace(editor.selection, result));
}
