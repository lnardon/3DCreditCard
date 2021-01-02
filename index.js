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
renderer.setClearColor(0x131313);
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

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

//LIGHTS
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 20, 50);
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

const geometry = new THREE.BoxGeometry(10, 6, 0.4);
const materials = new THREE.MeshNormalMaterial({ color: 0x8c43e6 });
const mesh = new THREE.Mesh(geometry, materials);
mesh.scale.set(6.5, 6.5, 6.5);
scene.add(mesh);

let fullname;
const loader = new THREE.FontLoader();
loader.load("./font.json", function (font) {
  const geometry2 = new THREE.TextGeometry("YOUR FULL NAME", {
    font: font,
    size: 3,
    height: 0.5,
    curveSegments: 21,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 10,
  });
  const materials2 = new THREE.MeshBasicMaterial({ color: 0xfafafa });
  fullname = new THREE.Mesh(geometry2, materials2);
  fullname.position.set(-30, -15, 1.5);
  scene.add(fullname);
  console.log(fullname);
});

//RENDER LOOP
requestAnimationFrame(render);

function render() {
  controls.update();
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
  scene.remove(fullname);
  let aux = fullname;
  aux.geometry.parameters.text = "DSDSD";
  console.log(aux.geometry.parameters.text);
  scene.add(aux);
});

document.getElementById("number").addEventListener("keypress", (e) => {
  // Change Card number Model
});

document.getElementById("expiration").addEventListener("keypress", (e) => {
  // Change Card Expiration Model
});
