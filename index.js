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

const loader = new THREE.FontLoader();
let current;
function createName(name = "YOUR NAME HERE") {
  if (current) {
    scene.remove(current);
  }
  loader.load("./font.json", function (font) {
    const geometry2 = new THREE.TextGeometry(name, {
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
    const mesh = new THREE.Mesh(geometry2, materials2);
    mesh.position.set(-30, -15, 1.5);
    current = mesh;
    scene.add(current);
  });
}
createName();

let prevNum;
function createNumber(number = "") {
  if (prevNum) {
    scene.remove(prevNum);
  }
  loader.load("./font.json", function (font) {
    const geometry2 = new THREE.TextGeometry(number, {
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
    const mesh = new THREE.Mesh(geometry2, materials2);
    mesh.position.set(-30, -5, 1.5);
    prevNum = mesh;
    scene.add(prevNum);
  });
}

let prevExp;
function createDate(date = "12/12") {
  if (prevExp) {
    scene.remove(prevExp);
  }
  loader.load("./font.json", function (font) {
    const geometry2 = new THREE.TextGeometry(date, {
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
    const mesh = new THREE.Mesh(geometry2, materials2);
    mesh.position.set(15, -15, 1.5);
    prevExp = mesh;
    scene.add(prevExp);
  });
}

let prevCvv;
function createCvv(date = "736") {
  if (prevCvv) {
    scene.remove(prevCvv);
  }
  loader.load("./font.json", function (font) {
    const geometry2 = new THREE.TextGeometry(date, {
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
    const mesh = new THREE.Mesh(geometry2, materials2);
    mesh.position.set(-15, -15, -1.5);
    mesh.rotateY(Math.PI);
    prevCvv = mesh;
    scene.add(prevCvv);
  });
}

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
document.getElementById("name").addEventListener("keyup", (e) => {
  // Change Card Name Model
  createName(e.target.value);
});

document.getElementById("number").addEventListener("keyup", (e) => {
  // Change Card number Model
  createNumber(e.target.value);
});

document.getElementById("expiration").addEventListener("keyup", (e) => {
  // Change Card Expiration Model
  createDate(e.target.value);
});

document.getElementById("cvv").addEventListener("keyup", (e) => {
  // Change Card Expiration Model
  createCvv(e.target.value);
});
