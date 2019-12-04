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
  constructor(device: Device) {
    this.device = device
  }
  togglePower() {
    if (this.device.isEnabled()) {
      this.device.disable()
    } else {
      this.device.enable()
    }
  }
  volumeDown() {
    this.device.setVolume(this.device.getVolume() - 10)
  }
  volumeUp() {
    this.device.setVolume(this.device.getVolume() + 10)
  }
  channelDown() {
    this.device.setChannel(this.device.getChannel() - 1)
  }
  channelUp() {
    this.device.setChannel(this.device.getChannel() + 1)
  }
}

class AdvancedRemote extends Remote {
  mute() {
    this.device.setVolume(0);
  }
}

// client code
const tv = new TV()
const remote = new Remote(tv)
remote.togglePower()

const radio = new Radio()
const remote2 = new AdvancedRemote(radio)