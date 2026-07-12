import { Renderer } from "./renderer.js";

export class Game {
  constructor() {}
  start() {
    console.log("Game start");
this.renderer = new Renderer();

this.lastTimestamp = null;
    this.loop();
  }
loop(timestamp) {
if (this.lastTimestamp === undefined) {
    this.lastTimestamp = timestamp;
}

    const dt = (timestamp - this.lastTimestamp) / 1000;

    this.lastTimestamp = timestamp;

    this.update(dt);

    requestAnimationFrame((t) => this.loop(t));

}
  update(dt) {

this.renderer.render();

  }
}
