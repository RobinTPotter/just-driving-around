export class Input {
  constructor() {
    this.left = false;
    this.right = false;
    this.throttle = false;
    this.brake = false;
    this.cameraView = "follow";

    document.onkeydown = (e) => {
      // console.log(e);
      if (e.code == "ArrowLeft") {
        this.left = true;
        // console.log("hi");
      } else if (e.code == "ArrowRight") {
        this.right = true;
      } else if (e.code == "KeyA") {
        this.throttle = true;
      } else if (e.code == "KeyZ") {
        this.brake = true;
      }
    };

    document.onkeyup = (e) => {
        console.log(e);
      if (e.code == "ArrowLeft") {
        this.left = false;
        // console.log("left");
      } else if (e.code == "ArrowRight") {
        this.right = false;
      } else if (e.code == "KeyA") {
        this.throttle = false;
      } else if (e.code == "KeyZ") {
        this.brake = false;
      } else if (e.code == "Digit1") {
        this.cameraView = "top";
        console.log("heii");
      } else if (e.code == "Digit2") {
        this.cameraView = "follow";
      } else if (e.code == "Digit3") {
        this.cameraView = "windscreen";
      }
    };
  }

  update() { }
}
