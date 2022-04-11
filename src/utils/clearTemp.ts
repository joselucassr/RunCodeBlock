import * as vscode from 'vscode';

const fs = require('fs');

export function clearTemp(): void {
  if (!vscode.workspace.workspaceFolders) {
    return;
  }

  fs.rmSync(
    `${vscode.workspace.workspaceFolders[0].uri.fsPath}/.vscode/runBlockTemp`,
    { recursive: true, force: true },
  );
}
