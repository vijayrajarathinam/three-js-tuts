import * as THREE from "./three.module.js";

const verticeAmount = 1000;

//1. Scene
const scene = new THREE.Scene(); // start a scene

// loading manager
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => console.log("Start...");
loadingManager.onLoad = () => console.log("Loading...");
loadingManager.onProgress = () => console.log("Progress...");
loadingManager.onError = () => console.error("Error!...");

const loader = new THREE.TextureLoader(loadingManager);
loader.load(
  "texture/color.jpg",
  async (texture) => {
    //2. Mesh
    const geometry = new THREE.SphereGeometry(1); // make object layout
    const material = new THREE.MeshBasicMaterial({ map: texture }); // make mesh layout
    const mesh = new THREE.Mesh(geometry, material); // create 3D mesh

    // stars
    const geometry1 = new THREE.BufferGeometry();
    const starLoader = await new THREE.TextureLoader(loadingManager).load(
      "texture/disc.png"
    );

    const material1 = new THREE.PointsMaterial({ map: starLoader }); // make mesh layout
    const positionArray = new Float32Array(verticeAmount * 3);

    for (let i = 0; i < verticeAmount * 3; i++)
      positionArray[i] = (Math.random() - 0.5) * 4;

    geometry1.setAttribute(
      "position",
      new THREE.BufferAttribute(positionArray, 3)
    );

    material1.size = 0.02;

    const stars = new THREE.Points(geometry1, material1); // create 3D mesh

    /// add Mesh to scene
    stars.position.z = -2;
    stars.scale.z = 1;
    scene.add(stars);
    scene.add(mesh);

    //3. Camera
    const aspect = { width: window.innerWidth, height: window.innerHeight };
    const camera = new THREE.PerspectiveCamera(
      75,
      aspect.width / aspect.height
    ); // human eye camera
    camera.position.z = 3; // z-index
    camera.position.x = 0;
    camera.position.y = 0;
    /// add Camera to scene
    scene.add(camera);

    //4. Renderer
    const canvas = document.querySelector(".draw"); // select canvas element
    const renderer = new THREE.WebGLRenderer({ canvas }); //add webgl renderer
    renderer.setSize(aspect.width, aspect.height); // set size for renderer

    //5. Clock
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      mesh.rotation.y = (elapsedTime * Math.PI) / 2;
      renderer.render(scene, camera); // display the scene in camera
      window.requestAnimationFrame(animate);
    };

    animate();
  },
  console.error
);
