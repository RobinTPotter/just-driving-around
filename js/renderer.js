import * as THREE from 'https://unpkg.com/three@0.181.1/build/three.module.js';

console.log(THREE);

export class Renderer {
  constructor() {
this.scene = new THREE.Scene();
this.camera = new THREE.THREE.PerspectiveCamera(55, 1.78, 1, 1000);
const canvas = document.querySelector('#c');
  this.renderer = new THREE.WebGLRenderer({antialias: true, canvas});
 


  const debugCar = new THREE.BoxGeometry( 1, 0.5, 1.5 );
const debugCarMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
this.debugCarMesh = new THREE.Mesh(debugCar, debugCarMaterial);
this.scene.add(debugCarMesh);
  }
  render() {
 

this.renderer.render(this.scene, this.camera);
  }
}
