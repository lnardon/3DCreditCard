// IMPORTS
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/MTLLoader.js";

//SCENE
const scene = new THREE.Scene();

//RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,
});
renderer.setClearColor(0xfafafa);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//CAMERA
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.z = 100;

//LIGHTS
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 20, 0);
scene.add(pointLight);

//OBJECT
// const loader = new OBJLoader();
// const mtlLoader = new MTLLoader();
// let card;
// mtlLoader.load("./card.mtl", (materials) => {
//   materials.preload();
//   loader.setMaterials(materials);
//   loader.load("./card.obj", (object) => {
//     card = object;
//     scene.add(card);
//   });
// });

//RENDER LOOP
requestAnimationFrame(render);

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

window.addEventListener(
  "resize",
  function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

// Event Listeners
document.getElementById("name").addEventListener("keypress", (e) => {
  // Change Card Name Model
});

document.getElementById("number").addEventListener("keypress", (e) => {
  // Change Card number Model
});

document.getElementById("expiration").addEventListener("keypress", (e) => {
  // Change Card Expiration Model
});
