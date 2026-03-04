<script lang="ts">
	import * as THREE from 'three';
	import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/examples/jsm/Addons.js';
	import { ASPECT_RATIO, FOV } from './constants';
	import { onMount } from 'svelte';

	onMount(async () => {
		const w = window.innerWidth;
		const h = window.innerHeight;
		const scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, 0.1, 80);
		camera.position.z = 10;
		camera.position.y = 1;

		// Setup renderer to be inside of the canvas
		const canvas = document.getElementById('model-canvas');
		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: canvas! });
		renderer.setSize(canvas!.clientWidth, canvas!.clientHeight);

		const ctrls = new OrbitControls(camera, renderer.domElement);
		ctrls.enableDamping = true;

		// Load the model
		const glbLoader = new GLTFLoader();
		const glb = await glbLoader.loadAsync('/purple_man.glb');
		const sankkitModel = glb.scene;
		scene.add(sankkitModel);

		// Create directional light
		var dirLight = new THREE.DirectionalLight(0xffffff, 5);
		scene.add(dirLight);

		function animate() {
			requestAnimationFrame(animate);

			renderer.render(scene, camera);
			ctrls.update();

			// Keep light aligned with camera
			dirLight.position.copy(camera.position);
		}

		animate();

		function handleWindowResize() {
			camera.aspect = canvas!.clientWidth / canvas!.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(canvas!.clientWidth, canvas!.clientHeight);
		}
		window.addEventListener('resize', handleWindowResize, false);
	});
</script>

<canvas
	id="model-canvas"
	class="pointer-events-none top-0 left-0 z-[-1] flex h-full w-full border-none"
></canvas>
