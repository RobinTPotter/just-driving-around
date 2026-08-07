import { Renderer } from "./renderer.js";
import { Car } from "./vehicle/car.js";
import { Input } from "./input.js";
import { RoadLoader } from "./roadio.js";
import { Road } from "./road.js";

export class Game {
  constructor() { }
  async start() {
    console.log("Game start");

    let r = Math.random();
    let md = await RoadLoader.load(`./test0.json?r=${r}`);
    this.road = new Road(md);
    this.input = new Input();

    this.car = new Car();
    this.car.position.x = this.road.data.nodes[0].position.x    +    (this.road.data.nodes[1].position.x - this.road.data.nodes[0].position.x)/20 ;
    this.car.position.z = this.road.data.nodes[0].position.z    +    (this.road.data.nodes[1].position.z - this.road.data.nodes[0].position.z)/20 ;
    this.car.heading = Math.atan2(this.road.data.nodes[1].position.x - this.road.data.nodes[0].position.x, this.road.data.nodes[1].position.z - this.road.data.nodes[0].position.z);
    this.car.velocity = 18;
    console.log("car heading: ", this.car.heading); 

    this.renderer = new Renderer(300, 150, this.road, this.car);
    this.div1 = document.querySelector("#hello1");
    this.div2 = document.querySelector("#hello2");
    this.div3 = document.querySelector("#hello3");
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
    this.div1.innerHTML = this.car.velocity.toFixed(4);
    this.div2.innerHTML = this.car.steering.toFixed(4);
    this.div3.innerHTML = JSON.stringify(q);
    this.renderer.cameraView = this.input.cameraView;
    this.renderer.setRoadEdgeDebugVisible(this.input.debugRoadEdges);
    // console.log(this.input.cameraView);

    this.renderer.render(this.car, this.road);
  }
}
