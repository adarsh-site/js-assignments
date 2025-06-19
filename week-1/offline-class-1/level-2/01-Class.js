
class Animal {
  constructor(name, legCount) {
    this.name = name
    this.legCount = legCount
  }
  describe() {
    return `${this.name} has ${this.legCount} legs`
  }
}

let cat = new Animal('Kimi', 4);
console.log(cat.describe());

let dog = new Animal('Dude', 4);
console.log(dog.describe());

