import * as THREE from "https://unpkg.com/three@0.181.1/build/three.module.js";

console.log(THREE);

export class Renderer {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, 1.78, 0.1, 1000);
    this.cam = "top";
    const canvas = document.querySelector("#c");
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    const debugCar = new THREE.BoxGeometry(1, 0.5, 1.5);
    //const debugCarMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
   
    const debugCarMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
    });

    this.debugCarMesh = new THREE.Mesh(debugCar, debugCarMaterial);
    this.scene.add(this.debugCarMesh);
  }
  render(car, road, buildings) {
    
    this.debugCarMesh.position.x = car.x;
    this.debugCarMesh.position.y = car.y;
    this.debugCarMesh.position.z = car.z;

    switch(this.cam) {    
        case "follow":
            this.camera.position.x = 0;
            this.camera.position.y = 0;
            this.camera.position.z = 20;
            this.camera.lookAt(0, 0, 0);
            break;
        case "top":
            this.camera.position.x = 0;
            this.camera.position.y = 20;
            this.camera.position.z = 0;
            this.camera.lookAt(0, 0, 0);
            break;
    }
    this.renderer.render(this.scene, this.camera);
  }
}
