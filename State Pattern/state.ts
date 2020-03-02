class Event {
  doubleclick() {}
}

class UserInterface {
  public lockButton: { onClick(): void };
  public playButton: { onClick(): void };
  public nextButton: { onClick(): void };
  public prevButton: { onClick(): void };
}

abstract class State {
  protected player: AudioPlayer
  protected event: Event

  // The context passes itself to the state constructor
  // so that the state can access its data and methods
  // int the future, if necessary.
  constructor(player: AudioPlayer) {
    this.player = player;
  }

  abstract clickLock(): void;
  abstract clickPlay(): void;
  abstract clickNext(): void;
  abstract clickPrevious(): void;
}

// The concrete states realize methods of abstract state by own way.
class LockerState extends State {
  // When you unlock the player with locked keys, it can accept one of two states.
  clickLock() {
    if (this.player.playing) {
      this.player.changeState(new PlayingState(this.player))
    } else {
      this.player.changeState(new ReadyState(this.player))
    }
  }

  clickPlay() {
    // Do nothing
  }

  clickNext() {
    // Do nothing
  }

  clickPrevious() {
    // Do nothing
  }
}

export class ReadyState extends State {
  clickLock() {
    this.player.changeState(new LockerState(this.player))
  }

  clickPlay() {
    this.player.startPlayback();
    this.player.changeState(new PlayingState(this.player));
  }

  clickNext() {
    this.player.nextSong();
  }

  clickPrevious() {
    this.player.previousSong();
  }
}

class PlayingState extends State {
  clickLock() {
    this.player.changeState(new LockerState(this.player));
  }

  clickPlay() {
    this.player.stopPlayback();
    this.player.changeState(new ReadyState(this.player));
  }

  clickNext() {
    if (this.event.doubleclick) {
      this.player.nextSong()
    } else {
      this.player.fastForward
    }
  }

  clickPrevious() {
    if (this.event.doubleclick) {
      this.player.previousSong();
    } else {
      this.player.rewind(5);
    }
  }
}

class AudioPlayer {
  private state: State;
  public playing: string;
  public UI; volume; playlist; currentSong;

  constructor() {
    this.state = new ReadyState(this);

    // Context makes the state respond to user input instead of itself.
    // The reaction may be different, depending on what state is currently active.
    this.UI = new UserInterface();
    this.UI.lockButton.onClick(this.clickLock());
    this.UI.playButton.onClick(this.clickPlay());
    this.UI.nextButton.onClick(this.clickNext());
    this.UI.prevButton.onClick(this.clickPrevious());
  }

  changeState(state: State) {
    this.state = state;
  }

  // UI methods will be delegate to active state
  clickLock() {
    this.state.clickLock();
  }

  clickPlay() {
    this.state.clickPlay();
  }

  clickNext() {
    this.state.clickNext();
  }

  clickPrevious() {
    this.state.clickPrevious();
  }

  // State service context methods
  startPlayback() {}

  stopPlayback() {}

  nextSong() {}

  previousSong() {}

  fastForward() {}

  rewind(sec: number) {}
}