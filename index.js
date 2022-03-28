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
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.z = 150;

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
// controls.autoRotate = true;
controls.autoRotateSpeed = 7;

//LIGHTS
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 30, 20);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 70;
scene.add(spotLight);
const spotLight2 = new THREE.SpotLight(0xffffff);
spotLight2.position.set(0, 30, -20);
spotLight2.castShadow = true;
spotLight2.shadow.mapSize.width = 1024;
spotLight2.shadow.mapSize.height = 1024;
spotLight2.shadow.camera.near = 500;
spotLight2.shadow.camera.far = 4000;
spotLight2.shadow.camera.fov = 70;
scene.add(spotLight2);

// OBJECT
const loader = new OBJLoader();
const mtlLoader = new MTLLoader();
let card;
mtlLoader.load("./card.mtl", (materials) => {
  materials.preload();
  loader.setMaterials(materials);
  loader.load("./card.obj", (object) => {
    card = object;
    card.rotateX(Math.PI / 2);
    card.scale.set(13, 13, 13);
    scene.add(card);
  });
});

function selectColor(e) {
  card.children[0].material = new THREE.MeshPhongMaterial({
    color: e.target.value,
  });
}

function toggleModal() {
  let cardInfoContainerRef =
    document.getElementsByClassName("cardInfoContainer")[0];
  let openModalBtnRef = document.getElementsByClassName("openModalBtn")[0];
  if (openModalBtnRef.style.display === "none") {
    cardInfoContainerRef.style.display = "none";
    openModalBtnRef.style.display = "flex";
  } else {
    cardInfoContainerRef.style.display = "flex";
    openModalBtnRef.style.display = "none";
  }
}

const floader = new THREE.FontLoader();
let current;
function createName(name = "YOUR NAME HERE") {
  if (current) {
    scene.remove(current);
  }
  floader.load("./font.json", function (font) {
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
    mesh.position.set(-30, -15, 1);
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
  floader.load("./font.json", function (font) {
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
    mesh.position.set(-30, -5, 1);
    prevNum = mesh;
    scene.add(prevNum);
  });
}

let prevExp;
function createDate(date = "12/12") {
  if (prevExp) {
    scene.remove(prevExp);
  }
  floader.load("./font.json", function (font) {
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
    mesh.position.set(15, -15, 1);
    prevExp = mesh;
    scene.add(prevExp);
  });
}

let prevCvv;
function createCvv(date = "736") {
  if (prevCvv) {
    scene.remove(prevCvv);
  }
  floader.load("./font.json", function (font) {
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
    mesh.position.set(-15, -15, -1);
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
document.getElementById("name").addEventListener("change", (e) => {
  // Change Card Name Model
  createName(e.target.value);
});

document.getElementById("number").addEventListener("change", (e) => {
  // Change Card number Model
  createNumber(e.target.value);
});

document.getElementById("expiration").addEventListener("change", (e) => {
  // Change Card Expiration Model
  createDate(e.target.value);
});

document.getElementById("cvv").addEventListener("change", (e) => {
  // Change Card Expiration Model
  createCvv(e.target.value);
});

document.getElementById("colorPicker").addEventListener("change", selectColor);

document.getElementById("confirm").addEventListener("click", toggleModal);

document
  .getElementsByClassName("openModalBtn")[0]
  .addEventListener("click", toggleModal);
