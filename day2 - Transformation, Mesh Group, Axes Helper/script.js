import * as THREE from "./three.module.js";

//1. Scene
const scene = new THREE.Scene(); // start a scene

//2.1 Mesh 1
const geometry = new THREE.BoxGeometry(1, 1, 1); // make object layout
const material = new THREE.MeshBasicMaterial({ color: "purple" }); // make mesh layout
const mesh = new THREE.Mesh(geometry, material); // create 3D mesh

//2.2 Mesh 2
const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({ color: "green" });
const mesh2 = new THREE.Mesh(geometry2, material2);

//2.3 Mesh Group
const group = new THREE.Group();
group.add(mesh, mesh2);
group.position.x = 1; // apply positional change to the group of meshes
group.position.y = 3;
group.scale.z = 1;
// group.rotate.x = 1.57;
scene.add(group);

//3. Helper
const axeHelper = new THREE.AxesHelper(); // represents x,y,z axis in the sceen
scene.add(axeHelper);

//4. Camera
const aspect = { width: window.innerWidth, height: window.innerHeight };
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height); // human eye camera
camera.position.z = 3; // z-index
camera.position.x = 1;
camera.position.y = 1;
/// add Camera to scene
scene.add(camera);

//5. Renderer
const canvas = document.querySelector(".draw"); // select canvas element
const renderer = new THREE.WebGLRenderer({ canvas }); //add webgl renderer
renderer.setSize(aspect.width, aspect.height); // set size for renderer
renderer.render(scene, camera); // display the scene in camera
