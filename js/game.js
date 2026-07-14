import { Renderer } from "./renderer.js";
import { Car } from "./vehicle/car.js";
import { Input } from "./input.js";

export class Game {
  constructor() {}
  start() {
    console.log("Game start");
    this.road = [
    {
      "position": {"x": 0, "y":0, "z": 0},
      "camber": 0,
      "width": 5,
      "strips": []
    },
    {
      "position": {"x": 10, "y":0, "z": 0},
      "camber": 0,
      "width": 5,
      "strips": []
    },
    {
      "position": {"x": 15, "y":0, "z": 0},
      "camber": 0,
      "width": 5,
      "strips": []
    },

    {
      "position": {"x": 18, "y":0, "z": 5},
      "camber": 0,
      "width": 5,
      "strips": []
    },

    {
      "position": {"x": 18, "y":0, "z":20},
      "camber": 0,
      "width": 5,
      "strips": []
    },

];
    this.roadEnded = false;

    this.buildings = [{"x": 20, "y": 5, "z":20, "width":5, "height":10, "depth":15, "angle": 0.1}];
    this.renderer = new Renderer(300,150, this.buildings, this.road, this.roadEnded);
    this.input = new Input();
    this.car = new Car();
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
