import { Renderer } from "./renderer.js";
import { Car } from "./vehicle/car.js";
import { Input } from "./input.js";

export class Game {
  constructor() { }
  start() {
    console.log("Game start");

    this.road = [{"position":{"x":-241,"y":0,"z":-182},"ex":366,"ey":230,"camber":0,"strips":[],"width":5},{"position":{"x":47,"y":0,"z":-235},"ex":654,"ey":177,"camber":0,"strips":[],"width":5},{"position":{"x":69,"y":0,"z":-239},"ex":676,"ey":173,"camber":0,"strips":[],"width":5},{"position":{"x":77,"y":0,"z":-231},"ex":684,"ey":181,"camber":0,"strips":[],"width":5},{"position":{"x":85,"y":0,"z":-220},"ex":692,"ey":192,"camber":0,"strips":[],"width":5},{"position":{"x":91,"y":0,"z":-204},"ex":698,"ey":208,"camber":0,"strips":[],"width":5},{"position":{"x":94,"y":0,"z":-189},"ex":701,"ey":223,"camber":0,"strips":[],"width":5},{"position":{"x":132,"y":0,"z":-32},"ex":739,"ey":380,"camber":0,"strips":[],"width":5},{"position":{"x":134,"y":0,"z":-14},"ex":741,"ey":398,"camber":0,"strips":[],"width":5},{"position":{"x":128,"y":0,"z":-1},"ex":735,"ey":411,"camber":0,"strips":[],"width":5},{"position":{"x":117,"y":0,"z":7},"ex":724,"ey":419,"camber":0,"strips":[],"width":5},{"position":{"x":101,"y":0,"z":16},"ex":708,"ey":428,"camber":0,"strips":[],"width":5},{"position":{"x":-195,"y":0,"z":78},"ex":412,"ey":490,"camber":0,"strips":[],"width":5},{"position":{"x":-214,"y":0,"z":72},"ex":393,"ey":484,"camber":0,"strips":[],"width":5},{"position":{"x":-227,"y":0,"z":61},"ex":380,"ey":473,"camber":0,"strips":[],"width":5},{"position":{"x":-241,"y":0,"z":25},"ex":366,"ey":437,"camber":0,"strips":[],"width":5},{"position":{"x":-280,"y":0,"z":-152},"ex":327,"ey":260,"camber":0,"strips":[],"width":5},{"position":{"x":-275,"y":0,"z":-166},"ex":332,"ey":246,"camber":0,"strips":[],"width":5},{"position":{"x":-266,"y":0,"z":-179},"ex":341,"ey":233,"camber":0,"strips":[],"width":5}];
    this.roadLooped = true;

    this.buildings = [{ "x": 20, "y": 5, "z": 20, "width": 5, "height": 10, "depth": 15, "angle": 0.1 }];
    this.renderer = new Renderer(300, 150, this.buildings, this.road, this.roadLooped);
    this.input = new Input();
    this.car = new Car();
    this.car.position = this.road[0].position;
    this.car.heading = Math.atan2(this.road[1].position.x - this.road[0].position.x, this.road[1].position.z - this.road[0].position.z);
    console.log("car heading: ", this.car.heading); 
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
    this.renderer.cameraView = this.input.cameraView;
    console.log(this.input.cameraView);

    this.renderer.render(this.car, this.road, this.buildings);
  }
}
