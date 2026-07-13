import * as THREE from "https://unpkg.com/three@0.181.1/build/three.module.js";

console.log(THREE);

export class Renderer {
  constructor(w,h, buildings, road) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, w/h , 0.1, 1000);
    this.cam = "windscreen";
    const canvas = document.querySelector("#c");
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    this.renderer.setPixelRatio(2);
    this.renderer.setSize( w*2, h*2, false );


    const debugCar = new THREE.BoxGeometry(1, 0.5, 1.5);
    //const debugCarMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
   
    const debugCarMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
    });

    this.debugCarMesh = new THREE.Mesh(debugCar, debugCarMaterial);
    this.scene.add(this.debugCarMesh);
console.log(buildings);
    for (let b=0;b<buildings.length;b++) {
console.log(buildings[b]);
     const buildingBox = new THREE.BoxGeometry(buildings[b].width, buildings[b].height, buildings[b].depth);
      const buildingMaterial = new THREE.MeshBasicMaterial({
      color: 0xff4400,
    });     
    const building = new THREE.Mesh(buildingBox, buildingMaterial);
    building.position.set(buildings[b].x,buildings[b].y,buildings[b].z);

this.scene.add(building);
    }


    const axisHelper = new THREE.AxesHelper(5);
    this.scene.add(axisHelper);
  }
  render(car, road, buildings) {
    
    this.debugCarMesh.position.x = car.x;
    this.debugCarMesh.position.y = car.y;
    this.debugCarMesh.position.z = car.z;
    this.debugCarMesh.rotation.y = car.heading;

    switch(this.cam) {    
        case "follow":
            this.camera.position.x = car.x - car.forward.x * 10;
            this.camera.position.y = car.y + 5;
            this.camera.position.z =  car.z  - car.forward.z * 10; 
            this.camera.lookAt(car.x, car.y, car.z);
            break;
        case "top":
            this.camera.position.x = car.x;
            this.camera.position.y = 20;
            this.camera.position.z = car.z;
            this.camera.lookAt(car.x, 0, car.z);
            break;

        case "windscreen":
            this.camera.position.x = car.x + car.forward.x * 5;
            this.camera.position.y = car.y ;
            this.camera.position.z =  car.z  + car.forward.z * 5; 
            this.camera.lookAt(car.x + car.forward.x * 10, car.y, car.z + car.forward.z * 10);
            break;

    }
    this.renderer.render(this.scene, this.camera);
  }
}
