interface Device {
  isEnabled?()
  enable?()
  disable?()
  getVolume?()
  setVolume?(percent)
  getChannel?()
  setChannel?(channel)
}

class Radio implements Device {}
class TV implements Device {}

class Remote {
  protected device: Device;
  togglePower() {
    if (this.device.isEnabled()) {
      this.device.disable()
    } else {
      this.device.enable()
    }
  }
  volumeDown() {}
  volumeUp() {}
  channelDown() {}
  channelUp() {
    const old = this.device.getChannel()
    this.device.setChannel(old + 1)
  }
}

class AdvancedRemote extends Remote {
  mute() {
    this.device.setVolume(0);
  }
}

class Client {
  public remote;
  setRemote(remote) {
    this.remote = remote;
  }
}

const client = new Client()
client.setRemote(new Remote)
client.remote.volumeDown()