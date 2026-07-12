export class Input {
  constructor() {
    this.left = false;
    this.right = false;
    this.throttle = false;
    this.brake = false;

    document.onkeydown = function (e) {
     // console.log(e);
      if (e.code == "ArrowLeft") {
        this.left = true;
        console.log("hi");
      } else if (e.code == "ArrowRight") {
        this.right = true;
      } else if (e.code == "KeyA") {
        this.throttle = true;
      } else if (e.code == "KeyZ") {
        this.brake = true;
      }
    };

    document.onkeyup = function (e) {
     //  console.log(e);
      if (e.code == "ArrowLeft") {
        this.left = false;
        console.log("left");
      } else if (e.code == "ArrowRight") {
        this.right = false;
      } else if (e.code == "KeyA") {
        this.throttle = false;
      } else if (e.code == "KeyZ") {
        this.brake = false;
      }
    };
  }

  update() {}
}
