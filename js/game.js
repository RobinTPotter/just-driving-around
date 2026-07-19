import { Renderer } from "./renderer.js";
import { Car } from "./vehicle/car.js";
import { Input } from "./input.js";
import { RoadLoader } from "./roadio.js";
import { Road } from "./road.js";

export class Game {
  constructor() { }
  async start() {
    console.log("Game start");

    let md = await RoadLoader.load("./mapdata/test.json");
    this.road = new Road(md);
    this.input = new Input();

    this.car = new Car();
    this.car.position.x = this.road.data.nodes[0].position.x    +    (this.road.data.nodes[1].position.x - this.road.data.nodes[0].position.x)/2 ;
    this.car.position.z = this.road.data.nodes[0].position.z    +    (this.road.data.nodes[1].position.z - this.road.data.nodes[0].position.z)/2 ;
    this.car.heading = Math.atan2(this.road.data.nodes[1].position.x - this.road.data.nodes[0].position.x, this.road.data.nodes[1].position.z - this.road.data.nodes[0].position.z);

    console.log("car heading: ", this.car.heading); 

    this.renderer = new Renderer(300, 150, this.road, this.car);

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
let q = this.road.query(this.car.segment,this.car.position.x,this.car.position.z);
  //  console.log(`car segment ${q}`);
    this.renderer.cameraView = this.input.cameraView;
   // console.log(this.input.cameraView);

    this.renderer.render(this.car, this.road);
  }
}
