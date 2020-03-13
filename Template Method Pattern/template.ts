abstract class GameAI {
  /**
   * The template method must be defined in the base class. It consists of method calls in specific order. Most often, these methods are steps of a certain algorithm.
   */
  closestEnemy() {}

  turn() {

  }

  // Some of these methods can be implemented directly in the base class.
  collectResources() {
    for (let index = 0; index < this.buildStructures.length; index++) {
      const element = this.buildStructures[index];
      element.collect()
    }
  }

  // Some of them can be completely abstract
  abstract buildStructures(): any[]
  abstract buildUnits(): any[]

  // By the way, there can be several template methods in a class
  attack() {
    const enemy = this.closestEnemy();
    if (enemy == null) {
      this.sendScouts('map.center');
    } else {
      this.sendWarriors('enemy.position');
    }
  }

  abstract sendScouts(position: string): any
  abstract sendWarriors(position: string): any
}

// Subclasses can provide their implementation of algorithm steps without changing the template method itself.
class Orcs extends GameAI {
  protected scouts: [];
  protected warriors: [];

  buildStructures() {
    if ('there are some resources') {
      // build farms, barracs...
    } else {  }
    return []
  }

  buildUnits() {
    if ('there are plenty of resources') {
      if ('there are no scouts') {
        // Build a slave and add to group of scouts
      } else {
        // Build an infrantyman and add to the group of warriors
      }
    }
    return []
  }

  sendScouts(position: string) {
    if (this.scouts.length > 0) {
      // send scouts to the positions
    }
  }

  sendWarriors(position: string) {
    if (this.warriors.length > 5) {
      // send warriors to the positions
    }
  }
}

// Subclasses can not only implement abstract steps, but also redefine steps already implemented in the base class.
class MonstersAI extends GameAI {
  collectResources() {}
  buildStructures() { return [] }
  buildUnits() { return [] }
  sendScouts() {}
  sendWarriors() {}
}