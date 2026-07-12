export class Game {
  constructor() {}
  start() {
    console.log("Game start");
    this.loop();
  }
  loop() {
    requestAnimationFrame(() => this.loop());
    this.update(0);
  }
  update(dt) {}
}
