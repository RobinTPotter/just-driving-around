console.log("hello");
import { Game } from "./game.js";
import * as THREE from 'https://unpkg.com/three@0.181.1/build/three.module.js';
console.log(THREE);
const game = new Game();
game.start();
