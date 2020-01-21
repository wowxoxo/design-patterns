// An abstract command defines a common interface for specific classes
abstract class Command2 {
  protected app: Application;
  protected editor: Editor;
  protected backup: string;

  constructor(app: Application, editor: Editor) {
    this.app = app;
    this.editor = editor;
  }

  // save editor status
  public saveBackup() {
    this.backup = this.editor.text;
  }

  // restore editor status
  public undo() {
    this.editor.text = this.backup;
  }

  // The main method remains abstract commands to each individual command defined it differently. The method should return true or false depending on whether the command changed the state of the editor, which means whether it needs to be saved in history.
  public abstract execute();
}

// Concrete commands
class CopyCommand extends Command2 {
  // The copy command is not written to the history, since it does not change the state of the editor.
  public execute() {
    this.app.clipboard = this.editor.getSelection();
    return false
  }
}

class CutCommand extends Command2 {
  // Commands that change the state of the editor save the state of the editor before their action and signal a change, returning true.
  public execute() {
    this.saveBackup();
    this.app.clipboard = this.editor.getSelection();
    this.editor.deleteSelection();
    return true
  }
}

class PasteCommand extends Command2 {
  public execute() {
    this.saveBackup();
    this.editor.replaceSelection(this.app.clipboard);
    return true
  }
}

// Cancel is also a command
class UndoCommand extends Command2 {
  public execute() {
    this.app.undo();
    return false
  }
}

// Global Command history - a stack
class CommandHistory {
  private history: Command2[];

  // Last logged in ...
  public push(c: Command2) {
    // Add a command to the end of the story array.
  }
  
  // ... comes out first
  // public pop(c?: Command2): Command2 {
  public pop(): Command2 {
    return 
  }
}


class Editor {
  public text: string;

  public getSelection(): string {
    // return selected text
    return
  }

  public deleteSelection(): void {
    // delete selected text
  }

  public replaceSelection(text): void {
    // Paste text from clipboard at cuttent position
  }
}

class ApplicationButton {
  public setCommand(cmd) {};
}

class Shortcut {
  public onkeyPress(key, cmd) {};
}

/**
 * The application class configures collaboration objects. He acts as a sender - creates teams to perform some actions.
 */
class Application {
  public clipboard: string;
  public history: CommandHistory;
  public editors: Editor[];
  public activeEditor: Editor;

  public copyButton: ApplicationButton;
  public cutButton: ApplicationButton;
  public pasteButton: ApplicationButton;
  public undoButton: ApplicationButton;
  public shortcuts: Shortcut;

  // The code that binds commands to interface elements may look something like this.
  public createUI() {
    let copy = function() {
      this.executeCommand(
        new CopyCommand(this, this.activeEditor)
      )
    }
    this.copyButton.setCommand(copy);
    this.shortcuts.onkeyPress("Ctrl+C", copy);

    let cut = function() {
      this.executeCommand(
        new CutCommand(this, this.activeEditor)
      )
    }
    this.cutButton.setCommand(cut);
    this.shortcuts.onkeyPress("Ctrl+X", cut);

    let paste = function() {
      this.executeCommand(
        new PasteCommand(this, this.activeEditor)
      )
    }
    this.pasteButton.setCommand(paste);
    this.shortcuts.onkeyPress("Ctrl+V", paste);

    let undo = function() {
      this.executeCommand(
        new UndoCommand(this, this.activeEditor)
      )
    }
    this.undoButton.setCommand(undo);
    this.shortcuts.onkeyPress("Ctrl+Z", undo);
    

  }

  // We start the command and check whether it is necessary to add its history.
  public executeCommand(commamd) {
    if (commamd.execute()) {
      this.history.push(commamd)
    }
  }

  // We take the last command from history and force it to cancel everything. We do not know the specific type of team, but this is not impotant, since each command knows how to cancel its action.
  public undo() {
    let command = this.history.pop();
    if (command != null) {
      command.undo()
    }
  }
}