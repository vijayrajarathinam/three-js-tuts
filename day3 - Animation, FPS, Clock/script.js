import * as THREE from "./three.module.js";

//1. Scene
const scene = new THREE.Scene(); // start a scene

//2. Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1); // make object layout
const material = new THREE.MeshBasicMaterial({ color: "purple" }); // make mesh layout
const mesh = new THREE.Mesh(geometry, material); // create 3D mesh

scene.add(mesh);

//3. Camera
const aspect = { width: window.innerWidth, height: window.innerHeight };
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height); // human eye camera
camera.position.z = 3; // z-index
/// add Camera to scene
scene.add(camera);

//4. Renderer
const canvas = document.querySelector(".draw"); // select canvas element
const renderer = new THREE.WebGLRenderer({ canvas }); //add webgl renderer
renderer.setSize(aspect.width, aspect.height); // set size for renderer

//5. Clock
const clock = new THREE.Clock();

// fps - frames per second
// function will be called 60 times per second
const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  mesh.rotation.y = elapsedTime * Math.PI;
  renderer.render(scene, camera); // display the scene in camera
  window.requestAnimationFrame(animate);
};

animate();
