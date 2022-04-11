import { TextEditor, TextEditorEdit, window } from 'vscode';

export default async function addCodeBlock(
  _: TextEditor,
  edit: TextEditorEdit,
) {
  if (!window.activeTextEditor) {
    return;
  }

  edit.insert(window.activeTextEditor.selection.start, '// Start-Block\n');
  edit.insert(window.activeTextEditor.selection.end, '\n// End-Block');
}
