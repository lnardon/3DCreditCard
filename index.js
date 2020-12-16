// IMPORTS
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";
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
const light1 = new THREE.AmbientLight(0xffffff, 0.8);
const light2 = new THREE.PointLight(0xffffff, 1);

scene.add(light1);
scene.add(light2);

//OBJECT
const loader = new OBJLoader();
const mtlLoader = new MTLLoader();
let ps5;
mtlLoader.load("./ps5.mtl", (materials) => {
  materials.preload();
  loader.setResourcePath("./textures/");
  loader.setMaterials(materials);
  loader.load("./ps5.obj", (object) => {
    ps5 = object;
    ps5.scale.set(10, 10, 10);
    scene.add(ps5);
  });
});

//RENDER LOOP
requestAnimationFrame(render);

function render() {
  if (ps5) {
    ps5.rotateY(Math.PI / 300);
  }
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
