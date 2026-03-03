<script lang="ts">
	import * as THREE from 'three';
	import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/examples/jsm/Addons.js';
	import { ASPECT_RATIO, FOV } from './constants';

	const w = window.innerWidth;
	const h = window.innerHeight;
	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, 0.1, 1000);
	camera.position.z = 5;
	const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.setSize(w, h);
	document.body.appendChild(renderer.domElement);

	const ctrls = new OrbitControls(camera, renderer.domElement);
	ctrls.enableDamping = true;
	const center = new THREE.Vector3();
	ctrls.target.copy(center);
	ctrls.update();

	// Load the model
	const glbLoader = new GLTFLoader();
	glbLoader.load('/purple_man.glb', (glb) => {
		const sankkitModel = glb.scene;
		scene.add(sankkitModel);
	});

	var dirLight = new THREE.DirectionalLight(0xffffff, 5);
	dirLight.position.set(600, 1000, 1500);
	scene.add(dirLight);

	function animate() {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
		ctrls.update();
	}

	animate();

	function handleWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
	window.addEventListener('resize', handleWindowResize, false);
</script>
