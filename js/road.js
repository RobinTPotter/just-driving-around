export class Road {
  constructor(roaddata) {
    this.data = roaddata;

    for (let nn = 0; nn < this.data.nodes.length; nn++) {
      let r = this.data.nodes[nn];
      let rn = this.data.nodes[(nn + 1) % this.data.nodes.length];
      r.diff = {
        x: rn.position.x - r.position.x,
        y: rn.position.y - r.position.y,
        z: rn.position.z - r.position.z,
      };
      r.mag = Math.sqrt(r.diff.x * r.diff.x + r.diff.y * r.diff.y + r.diff.z * r.diff.z);
      if (r.mag > 0)
        r.direction = { x: r.diff.x / r.mag, y: r.diff.y / r.mag, z: r.diff.z / r.mag };
      else r.direction = null;
      //console.log(r, rn, r.diff, r.mag);
    }

    // console.log(this.data.nodes);

    this.vertices = [];

    for (let nn = 0; nn < this.data.nodes.length; nn++) {
      //console.log(nn);
      let r = this.data.nodes[nn];
      let rn = this.data.nodes[(nn + 1) % this.data.nodes.length];

      let t1 = {
        x: r.position.x - (r.direction.z * r.width) / 2,
        y: r.position.y,
        z: r.position.z + (r.direction.x * r.width) / 2,
      };
      let t2 = {
        x: rn.position.x - (rn.direction.z * rn.width) / 2,
        y: rn.position.y,
        z: rn.position.z + (rn.direction.x * rn.width) / 2,
      };
      let t3 = {
        x: r.position.x + (r.direction.z * r.width) / 2,
        y: r.position.y,
        z: r.position.z - (r.direction.x * r.width) / 2,
      };

      let t4 = {
        x: r.position.x + (r.direction.z * r.width) / 2,
        y: r.position.y,
        z: r.position.z - (r.direction.x * r.width) / 2,
      };
      let t5 = {
        x: rn.position.x - (rn.direction.z * rn.width) / 2,
        y: rn.position.y,
        z: rn.position.z + (rn.direction.x * rn.width) / 2,
      };
      let t6 = {
        x: rn.position.x + (rn.direction.z * rn.width) / 2,
        y: rn.position.y,
        z: rn.position.z - (rn.direction.x * rn.width) / 2,
      };

      //console.log(t1, t2, t3);
      //console.log(t4, t5, t6);

      this.vertices.push(
        t1.x,         t1.y,        t1.z,
        t2.x,        t2.y,        t2.z,
        t3.x,        t3.y,        t3.z,
        t4.x,        t4.y,        t4.z,
        t5.x,        t5.y,        t5.z,
        t6.x,        t6.y,        t6.z,
      );

      if (!this.data.roadLooped && nn == this.data.nodes.length - 2) {
        console.log("no more");
        break;
      }
    }
  }

  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  query(segment, x, z) {
    if (segment == null) {
      console.log("TODO full sweep");
    } else {
      let r = this.data.nodes[segment];
      let rn = this.data.nodes[(segment + 1) % this.data.nodes.length];

      let rP = {
        x: x - r.position.x,
        y: 0 - r.position.y,
        z: z - r.position.z,
      };

      let right = { x: r.direction.z, y: r.direction.y, z: -r.direction.x };
      let along = Road.dot(rP, r.direction);
      let offset = Road.dot(rP, right);
    //   console.log(
    //     `r direction: ${r.direction.x},${r.direction.z}`,
    //   );
      //console.log(`along: ${along.toFixed(3)}, offset ${offset.toFixed(3)} of ${segment}`);
      if (along<=r.mag && along>=0) {
             // check where on road we are, this is dependant on width of both ends
             // we only need to know if in the road and what proportion we are at in terms of bands
             // if we are over the segment
      }
      return {"along": along, "offset": offset, "segment": segment, "diff": r.mag-along }
    }
  }
}
