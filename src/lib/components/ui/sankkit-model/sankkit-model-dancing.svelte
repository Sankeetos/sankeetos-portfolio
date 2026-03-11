<script lang="ts">
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/Addons.js';
	import { FOV, LARGE_SCALE, DEFAULT_MOBILE_BREAKPOINT, SMALL_SCALE } from './constants';
	import { onMount } from 'svelte';
	import { asset } from '$app/paths';

	let sankkitModel: THREE.Group<THREE.Object3DEventMap>;

	onMount(async () => {
		const scene = new THREE.Scene();

		// Setup renderer to be inside of the canvas
		const canvas = document.getElementById('model-canvas');

		// Width of the element divded by the height, to not get a squished image
		const ASPECT_RATIO = window.innerWidth / window.innerHeight;

		const camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, 0.1, 80);
		camera.position.z = 2;
		camera.position.y = 1.4;
		const defaultPosition = new THREE.Vector3(0, 1.5, 0);
		camera.lookAt(defaultPosition);
		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: canvas! });
		renderer.setSize(window.innerWidth, window.innerHeight);

		// Load the model
		const glbLoader = new GLTFLoader();
		const glb = await glbLoader.loadAsync(asset('/purple_man_dance.glb'));
		sankkitModel = glb.scene;

		scene.add(sankkitModel);

		let mixer = new THREE.AnimationMixer(sankkitModel);

		let action = mixer.clipAction(glb.animations[0], sankkitModel);
		action.play();

		function animate() {
			requestAnimationFrame(animate);
			mixer.update(1 / 100);
			renderer.render(scene, camera);
		}

		animate();

		function handleWindowResize() {
			const width = window.innerWidth;
			const height = window.innerHeight;

			camera.aspect = width / height;
			camera.updateProjectionMatrix();

			// Scale renderer and camera based on current width
			if (width > DEFAULT_MOBILE_BREAKPOINT) {
				// Mobile or Tablet scales
				renderer.setSize(width, height);
				camera.lookAt(defaultPosition);
			} else {
				// Laptop or Above scales
				renderer.setSize(window.outerWidth, window.outerHeight);
				const center = new THREE.Vector3();
				camera.lookAt(center);
				camera.position.z = 2;
				camera.position.y = 1.4;
			}

			// Update model size based on current width
			const responsiveScale = width < DEFAULT_MOBILE_BREAKPOINT ? SMALL_SCALE : LARGE_SCALE;
			sankkitModel.scale.set(responsiveScale, responsiveScale, responsiveScale);
		}
		window.addEventListener('resize', handleWindowResize, false);

		handleWindowResize();
	});
</script>

<div class="absolute top-0 left-0 flex">
	<canvas id="model-canvas" class="pointer-events-none overflow-hidden border-none"></canvas>
</div>
