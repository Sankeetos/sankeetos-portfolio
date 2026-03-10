<script lang="ts">
	import * as THREE from 'three';
	import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/examples/jsm/Addons.js';
	import { FOV } from './constants';
	import { onMount } from 'svelte';

	onMount(async () => {
		const scene = new THREE.Scene();
		// Setup renderer to be inside of the canvas
		const canvas = document.getElementById('model-canvas');

		const ASPECT_RATIO = canvas!.clientWidth / canvas!.clientWidth;

		const camera = new THREE.PerspectiveCamera(FOV, 0.1, 80);
		camera.position.z = 11;
		camera.position.y = 1;

		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: canvas! });
		renderer.setSize(canvas!.clientWidth, canvas!.clientHeight);

		const ctrls = new OrbitControls(camera, canvas);
		ctrls.enableDamping = true;

		// Set min and max distance to stop model from getting to large/small
		ctrls.maxDistance = 13;
		ctrls.minDistance = 11.5;

		// Load the model
		const glbLoader = new GLTFLoader();
		const glb = await glbLoader.loadAsync('/purple_man.glb');
		const sankkitModel = glb.scene;
		sankkitModel.scale.set(1.5, 1.5, 1.5);
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
			const newWidth = canvas!.clientWidth;
			const newHeight = canvas!.clientHeight;

			camera.aspect = newWidth / newHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(newWidth, newHeight);
		}
		window.addEventListener('resize', handleWindowResize, false);
	});
</script>

<canvas id="model-canvas" class="r-0 fixed top-0 float-right flex overflow-hidden border-none"
></canvas>
