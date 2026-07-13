import { Renderer } from "./renderer.js";
import { Car } from "./vehicle/car.js";
import { Input } from "./input.js";

export class Game {
  constructor() {}
  start() {
    console.log("Game start");
    this.renderer = new Renderer(300,150);
    this.input = new Input();
    this.car = new Car();
    this.road = null;
    this.buildings = [];
    this.lastTimestamp = null;
    this.loop(0);
  }
  loop(timestamp) {
    if (this.lastTimestamp === null) {
      this.lastTimestamp = timestamp;
    }

    const dt = (timestamp - this.lastTimestamp) / 1000;

    this.lastTimestamp = timestamp;

    this.update(dt);


    requestAnimationFrame((t) => this.loop(t));
  }
  update(dt) {
    if (!dt) return;
    this.car.update(dt, this.input);

    this.renderer.render(this.car, this.road, this.buildings);
  }
}
