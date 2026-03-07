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
		renderer.setSize(canvas!.clientWidth, canvas!.clientHeight);

		// Load the model
		const glbLoader = new GLTFLoader();
		const glb = await glbLoader.loadAsync(asset('/purple_man_dance.glb'));
		sankkitModel = glb.scene;

		const isMobile = window.innerWidth < 768;
		function resizeModel() {
			sankkitModel.scale.set(1.5, 1.5, 1.5);
		}
		resizeModel();

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
			const newWidth = window.innerWidth;
			const newHeight = window.outerWidth;
			// camera.aspect = newWidth / newHeight;
			resizeModel();
			renderer.setSize(newWidth, newHeight);
			camera.updateProjectionMatrix();
		}
		window.addEventListener('resize', handleWindowResize, false);
	});
</script>

<canvas
	id="model-canvas"
	class="r-[-20%] pointer-events-none flex h-full w-full justify-self-end overflow-hidden border-none md:absolute md:top-10 md:right-0"
></canvas>
