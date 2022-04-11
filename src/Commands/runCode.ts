import { window, workspace } from 'vscode';

const nReadlines = require('n-readlines');
const fs = require('fs');

export default async function runCode(lineValue: number) {
  const editor = window.activeTextEditor;
  if (!editor) {
    return;
  }

  if (!workspace.workspaceFolders) {
    return;
  }

  await editor.document.save();

  const filePath = editor.document.fileName;
  const fileToRun = new nReadlines(filePath);

  let depth = 0;
  let line;
  let lineNumber = 1;

  let fileArr = [];

  // Reads line by line
  while ((line = fileToRun.next())) {
    // Picks up from the clicked line
    if (lineNumber > lineValue) {
      if (line.toString('ascii').match(/\/\/.*Start-Block/)) {
        depth += 1;
      }

      if (line.toString('ascii').match(/\/\/.*End-Block/) && depth === 0) {
        break;
      }

      if (line.toString('ascii').match(/\/\/.*End-Block/) && depth !== 0) {
        depth -= 1;
      }

      fileArr.push(line.toString('ascii'));
    }

    lineNumber++;
  }

  // Creates the .vscode/temp dir if not created
  fs.mkdirSync(`${workspace.workspaceFolders[0].uri.fsPath}/.vscode/temp`, {
    recursive: true,
  });

  // Creates the file to be run
  fs.writeFileSync(
    `${workspace.workspaceFolders[0].uri.fsPath}/.vscode/temp/runCodeBlock.js`,
    fileArr.join('\n'),
  );

  // Terminal stuff

  let terminal = null;
  if (window.terminals) {
    terminal = window.terminals.find(
      (terminal) => terminal.name === 'RunBlock',
    );
  }

  if (!terminal) {
    terminal = window.createTerminal(`RunBlock`);
  }

  terminal.show(true);
  terminal.sendText('clear');

  terminal.sendText(`node .vscode/temp/runCodeBlock.js`);
}
