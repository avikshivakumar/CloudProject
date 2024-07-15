let scene, camera, renderer, model;

init();
animate();

function init() {
  // Create the scene
  scene = new THREE.Scene();
  
  // Set up the camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 3);

  // Set up the renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Add a light source
  const light = new THREE.DirectionalLight(0xffffff, 5);
  light.position.set(5, 5, 5).normalize();
  scene.add(light);
  
  // Set up orbit controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Enable damping (inertia)
  controls.dampingFactor = 0.25; // Damping factor
  controls.screenSpacePanning = false; // Disable panning

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    // Update the controls
    controls.update();
    renderer.render(scene, camera);
}

function loadModel(modelPath) {
  const loader = new THREE.GLTFLoader();
  loader.load(modelPath, function(gltf) {
    if (model) {
      scene.remove(model);
    }
    model = gltf.scene;
    scene.add(model);
  }, undefined, function(error) {
    console.error(error);
  });
}