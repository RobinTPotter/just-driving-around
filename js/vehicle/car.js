export class Car {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.velocity = 0;
    this.forward = {"x":0, "y":0};
    this.throttle = 0;
    this.T = 0.5;  //throttle max
    this.D = 0.99; // drag
    this.steering = 0;
    this.heading = 0;
    this.steeringMax = 4;
    this.steeringSpeed = 3.5;
    this.steeringRest = 0.8; //drag for steering
    this.DZ = 0.001;  // steering dead zone
    this.VDZ = 0.001; //veocity dead zone
  }
  update(dt, input) {
    if (input.left && this.steering > -this.steeringMax)
      this.steering -= this.steeringSpeed * dt;
    else if (input.right && this.steering < this.steeringMax)
      this.steering += this.steeringSpeed * dt;
    else {
        this.steering *= this.steeringRest;
    }
    if (this.steering<this.DZ && this.steering>-this.DZ) this.steering=0;





   // console.log(this.steering, input.left, input.right, input.throttle, this);




    if (input.throttle) this.velocity += this.T;
    this.velocity *= this.D;
    if (this.velocity>-this.VDZ && this.velocity<this.VDZ) this.velocity = 0 ;

    let K = 0.1
    this.heading -= this.steering * this.velocity * dt * K;
    this.forward.x = Math.sin(this.heading);
    this.forward.z = Math.cos(this.heading);
    this.x += Math.sin(this.heading) * this.velocity * dt;
    this.z += Math.cos(this.heading) * this.velocity * dt;

  //  console.log("car x: ", dt, this.velocity,  this.x)
  }
}
