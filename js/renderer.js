import * as THREE from "https://unpkg.com/three@0.181.1/build/three.module.js";

console.log(THREE);

export class Renderer {
    constructor(w, h, buildings, road, roadLooped, car) {
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
        //console.log(buildings);
        for (let b = 0; b < buildings.length; b++) {
            //console.log(buildings[b]);
            const buildingBox = new THREE.BoxGeometry(buildings[b].width, buildings[b].height, buildings[b].depth);
            const buildingMaterial = new THREE.MeshBasicMaterial({ color: 0xff4400, });
            const building = new THREE.Mesh(buildingBox, buildingMaterial);
            building.position.set(buildings[b].x, buildings[b].y, buildings[b].z);
            building.rotation.y = buildings[b].angle;

            this.scene.add(building);
        }


        for (let nn = 0; nn < road.length; nn++) {
            //console.log(nn);
            let r = road[nn];
            let rn = road[(nn + 1) % (road.length)];
            let diff = {
                "x": rn.position.x - r.position.x,
                "y": rn.position.y - r.position.y,
                "z": rn.position.z - r.position.z
            }
            let mag = Math.sqrt(diff.x * diff.x +
                diff.y * diff.y +
                diff.z * diff.z);
            if (mag > 0) r.direction = { "x": diff.x / mag, "y": diff.y / mag, "z": diff.z / mag };
            else r.direction = null;
            //console.log(r, rn, diff, mag);
        }

        const roadGeometry = new THREE.BufferGeometry();
        const vertices = [];

        for (let nn = 0; nn < road.length; nn++) {
            //console.log(nn);
            let r = road[nn];
            let rn = road[(nn + 1) % (road.length)];

            let t1 = { "x": r.position.x - r.direction.z * r.width / 2, "y": r.position.y, "z": r.position.z + r.direction.x * r.width / 2 };
            let t2 = { "x": rn.position.x - rn.direction.z * rn.width / 2, "y": rn.position.y, "z": rn.position.z + rn.direction.x * rn.width / 2 };
            let t3 = { "x": r.position.x + r.direction.z * r.width / 2, "y": r.position.y, "z": r.position.z - r.direction.x * r.width / 2 };

            let t4 = { "x": r.position.x + r.direction.z * r.width / 2, "y": r.position.y, "z": r.position.z - r.direction.x * r.width / 2 };
            let t5 = { "x": rn.position.x - rn.direction.z * rn.width / 2, "y": rn.position.y, "z": rn.position.z + rn.direction.x * rn.width / 2 };
            let t6 = { "x": rn.position.x + rn.direction.z * rn.width / 2, "y": rn.position.y, "z": rn.position.z - rn.direction.x * rn.width / 2 };

            //console.log(t1, t2, t3);
            //console.log(t4, t5, t6);

            vertices.push(
                t1.x, t1.y, t1.z,
                t2.x, t2.y, t2.z,
                t3.x, t3.y, t3.z,
                t4.x, t4.y, t4.z,
                t5.x, t5.y, t5.z,
                t6.x, t6.y, t6.z,
            )

            if (!roadLooped && nn == road.length - 2) { console.log("no more"); break };
        }


        roadGeometry.setAttribute(
            'position', new THREE.Float32BufferAttribute(vertices, 3)
        );

        const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });

        const roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);


        this.scene.add(roadMesh);


        const axisHelper = new THREE.AxesHelper(5);
        this.scene.add(axisHelper);
    }
    
    render(car, road, buildings) {

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
