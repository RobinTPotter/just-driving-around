import * as THREE from 'https://unpkg.com/three@0.181.1/build/three.module.js';

console.log(THREE);

export class Renderer {
  constructor() {
this.scene = new THREE.Scene();
this.camera = new THREE.PerspectiveCamera(55, 1.78, 1, 1000);
const canvas = document.querySelector('#c');
  this.renderer = new THREE.WebGLRenderer({antialias: true, canvas});
 


  const debugCar = new THREE.BoxGeometry( 1, 0.5, 1.5 );
//const debugCarMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});


const debugCarMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00
});

this.debugCarMesh = new THREE.Mesh(debugCar, debugCarMaterial);
this.scene.add(this.debugCarMesh);
  }
  render() {
 
this.debugCarMesh.position.x = 0;
this.debugCarMesh.position.y = 0;
this.debugCarMesh.position.z = 0;
this.camera.position.x=0;
this.camera.position.y=0;
this.camera.position.z=1;
this.camera.lookAt(0,0,0);
this.renderer.render(this.scene, this.camera);
  }
}
