import * as THREE from "https://unpkg.com/three@0.181.1/build/three.module.js";

console.log(THREE);

export class Renderer {
    constructor(w, h, road, car) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 1000);
        this.cameraView = "top";
        const canvas = document.querySelector("#c");
        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

        this.renderer.setPixelRatio(2);
        this.renderer.setSize(w * 2, h * 2, false);


        const debugCar = new THREE.BoxGeometry(car.width, 0.5, car.wheelbase);
        //const debugCarMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});

        const debugCarMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff00,
        });

        this.debugCarMesh = new THREE.Mesh(debugCar, debugCarMaterial);
        this.scene.add(this.debugCarMesh);
        //console.log(road.data.buildings);
        for (let b = 0; b < road.data.buildings.length; b++) {
            //console.log(road.buildings[b]);
            const buildingBox = new THREE.BoxGeometry(road.data.buildings[b].width, road.data.buildings[b].height, road.data.buildings[b].depth);
            const buildingMaterial = new THREE.MeshBasicMaterial({ color: 0xff4400, });
            const building = new THREE.Mesh(buildingBox, buildingMaterial);
            building.position.set(road.data.buildings[b].x, road.data.buildings[b].y, road.data.buildings[b].z);
            building.rotation.y = road.data.buildings[b].angle;

            this.scene.add(building);
        }



        console.log(road);
        const roadGeometry = new THREE.BufferGeometry();

        roadGeometry.setAttribute(
            'position', new THREE.Float32BufferAttribute(road.vertices, 3)
        );

        const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });

        const roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);


        this.scene.add(roadMesh);


        const axisHelper = new THREE.AxesHelper(5);
        this.scene.add(axisHelper);
    }
    
    render(car) {

        this.debugCarMesh.position.x = car.position.x;
        this.debugCarMesh.position.y = car.position.y;
        this.debugCarMesh.position.z = car.position.z;
        this.debugCarMesh.rotation.y = car.heading;

        switch (this.cameraView) {
            case "follow":
                this.camera.position.x = car.position.x - car.forward.x * 10;
                this.camera.position.y = car.position.y + 5;
                this.camera.position.z = car.position.z - car.forward.z * 10;
                this.camera.lookAt(car.position.x, car.position.y, car.position.z);
                break;
            case "top":
                this.camera.position.x = car.position.x;
                this.camera.position.y = 20;
                this.camera.position.z = car.position.z;
                this.camera.lookAt(car.position.x, 0, car.position.z);
                break;
            case "windscreen":
                this.camera.position.x = car.position.x + car.forward.x * 5;
                this.camera.position.y = car.position.y+2;
                this.camera.position.z = car.position.z + car.forward.z * 5;
                this.camera.lookAt(car.position.x + car.forward.x * 10, car.position.y, car.position.z + car.forward.z * 10);
                break;

        }
        this.renderer.render(this.scene, this.camera);
    }
}
