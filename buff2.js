

/*
const geometry = new THREE.BufferGeometry();

// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.

const vertices = new Float32Arr.position.y( [
	-1.0, -1.0,  1.0, // v0
	 1.0, -1.0,  1.0, // v1
	 1.0,  1.0,  1.0, // v2
	 1.0,  1.0,  1.0, // v3
	-1.0,  1.0,  1.0, // v4
	-1.0, -1.0,  1.0  // v5
] );

// itemSize = 3 because there are 3 values (components) per vertex

geometry.setAttribute(
 'position', new THREE.BufferAttribute( vertices, 3 ) 
);

const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

const mesh = new THREE.Mesh( geometry, material );
*/

let road = [
    {
      "position": {"x": 0, "y":0, "z": 0},
      "camber": 0,
      "width": 5,
      "strips": [],
      "name": "A",
    },
    {
      "position": {"x": 10, "y":0, "z": 0},
      "camber": 0,
      "width": 8,
      "strips": [],
      "name": "B",
    },
    {
      "position": {"x": 15, "y":0, "z": 5},
      "camber": 0,
      "width": 5,
      "strips": [],
      "name": "C",
    },
];

console.log(road);

let ended = false;

for (let nn=0; nn<road.length; nn++) {
    console.log(nn);
    let r = road[nn];
    let rn = road[(nn+1) % (road.length)];
    let diff = {
        "x": rn.position.x-r.position.x,
        "y": rn.position.y-r.position.y,
        "z": rn.position.z-r.position.z
    }
    let mag = Math.sqrt(diff.x*diff.x +
        diff.y*diff.y +
        diff.z*diff.z);
    if (mag>0) r.direction = {"x": diff.x/mag, "y": diff.y/mag, "z": diff.z/mag };
    else r.direction = null;
    console.log(r, rn, diff, mag);
}

for (let nn=0; nn<road.length; nn++) {
    console.log(nn);
    let r = road[nn];
    let rn = road[(nn+1) % (road.length)];

    let t1 = {"x": r.position.x-r.direction.z*r.width/2, "y": r.position.y, "z": r.position.z+r.direction.x*r.width/2};
    let t2 = {"x": rn.position.x-rn.direction.z*rn.width/2, "y": rn.position.y, "z": rn.position.z+rn.direction.x*rn.width/2 };
    let t3 = {"x": r.position.x+r.direction.z*r.width/2, "y": r.position.y, "z": r.position.z- r.direction.x*r.width/2 };

    let t4 = {"x": r.position.x+r.direction.z*r.width/2, "y": r.position.y, "z": r.position.z- r.direction.x*r.width/2 };
    let t5 = {"x": rn.position.x-rn.direction.z*rn.width/2, "y":  rn.position.y, "z":  rn.position.z+rn.direction.x*rn.width/2 };
    let t6 = {"x": rn.position.x+rn.direction.z*rn.width/2, "y": rn.position.y, "z": rn.position.z-rn.direction.x*rn.width/2 };

    console.log(t1,t2,t3);
    console.log(t4, t5, t6);
    if (!ended && nn==road.length-2) { console.log("no more"); break};
}



