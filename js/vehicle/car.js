export class Car {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.velocity = 0;
    this.throttle = 0;
    this.steering = 0;
    this.steeringMax = 20;
    this.steeringSpeed = 10;
  }
  update(dt, input) {
    if (input.left && this.steering > -this.steeringMax)
      this.steering -= this.steeringSpeed * dt;
    else if (input.right && this.steering < this.steeringMax)
      this.steering += this.steeringSpeed * dt;
    else {
        this.steering *= 0.8;
    }
    if (this.steering<0.001 && this.steering>-0.001) this.steering=0;
    console.log(this.steering, input.left, input.right);
  }
}
