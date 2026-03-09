<script lang="ts">
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/Addons.js';
	import { FOV } from './constants';
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

			renderer.setSize(width, height);

			// Update model size based on current width
			if (sankkitModel) {
				const responsiveScale = width < 768 ? 0.6 : 1.5;
				sankkitModel.scale.set(responsiveScale, responsiveScale, responsiveScale);
			}
		}
		window.addEventListener('resize', handleWindowResize, false);

		handleWindowResize();
	});
</script>

<canvas
	id="model-canvas"
	class="r-[-20%] pointer-events-none top-10 flex justify-self-end overflow-hidden border-none md:absolute md:right-0"
></canvas>
