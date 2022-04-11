import * as vscode from 'vscode';
import { RunCodeLensProvider } from './runCodeLensProvider';

import addCodeBlock from './Commands/addCodeBlock';
import runCode from './Commands/runCode';

const fs = require('fs');

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "runcodeblock" is now active!');

  let runCodeBlockDisposable = vscode.commands.registerCommand(
    'runcodeblock.runCodeBlock',
    runCode,
  );

  // Get a document selector for the CodeLens provider
  // This one is any file that has the language of javascript
  let docSelector = {
    language: 'javascript',
    scheme: 'file',
  };

  // Register our CodeLens provider
  let codeLensProviderDisposable = vscode.languages.registerCodeLensProvider(
    docSelector,
    new RunCodeLensProvider(),
  );

  let addCodeBlockDisposable = vscode.commands.registerTextEditorCommand(
    'runcodeblock.addCodeBlock',
    addCodeBlock,
  );

  context.subscriptions.push(runCodeBlockDisposable);
  context.subscriptions.push(addCodeBlockDisposable);
  context.subscriptions.push(codeLensProviderDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
  if (!vscode.workspace.workspaceFolders) {
    return;
  }

  fs.unlinkSync(
    `${vscode.workspace.workspaceFolders[0].uri.fsPath}/.vscode/temp/runCodeBlock.js`,
  );
}
