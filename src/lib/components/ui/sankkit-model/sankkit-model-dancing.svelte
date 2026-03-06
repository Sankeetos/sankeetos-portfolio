<script lang="ts">
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/Addons.js';
	import { FOV } from './constants';
	import { onMount } from 'svelte';

	let sankkitModel: THREE.Group<THREE.Object3DEventMap>;

	onMount(async () => {
		const scene = new THREE.Scene();

		// Setup renderer to be inside of the canvas
		const canvas = document.getElementById('model-canvas');

		// Width of the element divded by the height, to not get a squished image
		const ASPECT_RATIO = canvas!.clientWidth / canvas!.clientWidth;

		const camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, 0.1, 80);
		camera.position.z = 2;
		camera.position.y = 1;
		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: canvas! });
		renderer.setSize(canvas!.clientWidth, canvas!.clientHeight);

		// Load the model
		const glbLoader = new GLTFLoader();
		const glb = await glbLoader.loadAsync('/purple_man_dance.glb');
		sankkitModel = glb.scene;

		const isMobile = window.innerWidth < 768;
		function resizeModel() {
			isMobile ? sankkitModel.scale.set(0.8, 0.8, 0.8) : sankkitModel.scale.set(1.2, 1.2, 1.2);
		}

		resizeModel();

		scene.add(sankkitModel);

		let mixer = new THREE.AnimationMixer(sankkitModel);

		let action = mixer.clipAction(glb.animations[0], sankkitModel);
		action.play();

		function animate() {
			requestAnimationFrame(animate);

			mixer.update(1 / 130);

			renderer.render(scene, camera);
		}

		animate();

		function handleWindowResize() {
			const newWidth = canvas!.clientWidth;
			const newHeight = canvas!.clientHeight;
			camera.aspect = newWidth / newHeight;
			resizeModel();
			renderer.setSize(newWidth, newHeight);
		}
		window.addEventListener('resize', handleWindowResize, false);
	});
</script>

<canvas
	id="model-canvas"
	class="r-[-20%] pointer-events-none flex h-full w-full justify-self-end overflow-hidden border-none md:fixed md:top-10 md:right-0"
></canvas>
