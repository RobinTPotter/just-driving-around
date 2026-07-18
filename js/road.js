export class Road {

    constructor(roaddata) {
        this.data = roaddata;
          //  console.log(this.data.nodes);


        for (let nn = 0; nn < this.data.nodes.length; nn++) {

            let r = this.data.nodes[nn];
            let rn = this.data.nodes[(nn + 1) % (this.data.nodes.length)];
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

           // console.log(this.data.nodes);

        this.vertices = [];

        for (let nn = 0; nn < this.data.nodes.length; nn++) {
            //console.log(nn);
            let r = this.data.nodes[nn];
            let rn = this.data.nodes[(nn + 1) % (this.data.nodes.length)];

            let t1 = { "x": r.position.x - r.direction.z * r.width / 2, "y": r.position.y, "z": r.position.z + r.direction.x * r.width / 2 };
            let t2 = { "x": rn.position.x - rn.direction.z * rn.width / 2, "y": rn.position.y, "z": rn.position.z + rn.direction.x * rn.width / 2 };
            let t3 = { "x": r.position.x + r.direction.z * r.width / 2, "y": r.position.y, "z": r.position.z - r.direction.x * r.width / 2 };

            let t4 = { "x": r.position.x + r.direction.z * r.width / 2, "y": r.position.y, "z": r.position.z - r.direction.x * r.width / 2 };
            let t5 = { "x": rn.position.x - rn.direction.z * rn.width / 2, "y": rn.position.y, "z": rn.position.z + rn.direction.x * rn.width / 2 };
            let t6 = { "x": rn.position.x + rn.direction.z * rn.width / 2, "y": rn.position.y, "z": rn.position.z - rn.direction.x * rn.width / 2 };

            //console.log(t1, t2, t3);
            //console.log(t4, t5, t6);

            this.vertices.push(
                t1.x, t1.y, t1.z,
                t2.x, t2.y, t2.z,
                t3.x, t3.y, t3.z,
                t4.x, t4.y, t4.z,
                t5.x, t5.y, t5.z,
                t6.x, t6.y, t6.z,
            )

            if (!this.data.roadLooped && nn == this.data.nodes.length - 2) { console.log("no more"); break };
        }




    }  


 vector_angle(v) {
	if (v.y==0) {
		if (v.x>0) return 0; else return Math.PI;
	} else if (v.x==0) {
		if (v.y>0) return Math.PI/2; else return 3*Math.PI/2;
	} else {
		var ang=Math.abs(Math.atan(v.y/v.x));
		if (v.x>0 & v.y>0) return ang;
		else if (v.x>0 & v.y<0) return 2*Math.PI-ang;
		else if (v.x<0 & v.y>0) return Math.PI-ang;
		else if (v.x<0 & v.y<0) return Math.PI+ang;
	}
}

 vector_anglebetween(v1,v2) {
	var an1=this.vector_angle(v1);
	var an2=this.vector_angle(v2);
	var diff=0;
	if (an1>an2) diff=Math.abs(an1-an2); else diff=Math.abs(an2-an1);
	if (diff>Math.PI) diff=2*Math.PI-diff;
	return diff;
}



    query(segment,x,z) {
        if (segment==null) {
             console.log("TODO full sweep");
        } else {
            let r = this.data.nodes[segment];
            let rn = this.data.nodes[(segment + 1) % (this.data.nodes.length)];
            let A = this.vector_anglebetween({x:r.position.x , y:r.position.z} , {x:rn.position.x , y:rn.position.z });
            let b = Math.sqrt(   
(r.position.x - x)*(r.position.x - x)   +  (r.position.x - z)*(r.position.x - z)  
            );
            let d = b*Math.sin(A);
            console.log(`distance: ${d}`);
        }
        

    }


}