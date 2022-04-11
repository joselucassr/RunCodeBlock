import { TextEditor, TextEditorEdit, Position, window } from 'vscode';

export default async function addCodeBlock(
  _: TextEditor,
  edit: TextEditorEdit,
) {
  if (!window.activeTextEditor) {
    return;
  }

  console.log(window.activeTextEditor.selection.end);

  let selectionStart = window.activeTextEditor.selection.start.line;
  let selectionEnd = window.activeTextEditor.selection.end.line;

  edit.insert(new Position(selectionStart, 0), '// Start-Block\n');
  edit.insert(new Position(selectionEnd, Infinity), '\n// End-Block');
}
