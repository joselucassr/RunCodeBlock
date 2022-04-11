import { TextEditor, TextEditorEdit, window } from 'vscode';

export default async function addCodeBlock(
  editor: TextEditor,
  edit: TextEditorEdit,
) {
  editor.selections.forEach((selection, i) => {
    // For a future function to add start and end to selection
    if (!window.activeTextEditor) {
      return;
    }
    console.log(window.activeTextEditor?.selection);

    edit.insert(window.activeTextEditor.selection.start, '// Start-Block\n');
    edit.insert(window.activeTextEditor.selection.end, '\n// End-Block');
  });
}
