<script lang="ts">
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/Addons.js';
	import { FOV, LARGE_SCALE, DEFAULT_POSITION, ASPECT_RATIO, WIDTH, HEIGHT } from './constants';
	import { onMount } from 'svelte';
	import { asset } from '$app/paths';

	let sankkitModel: THREE.Group<THREE.Object3DEventMap>;

	onMount(async () => {
		const scene = new THREE.Scene();

		// Setup renderer to be inside of the canvas
		const canvas = document.getElementById('model-canvas');

		const camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, 0.1, 80);
		camera.position.z = 2;
		camera.position.y = 1.4;
		camera.lookAt(DEFAULT_POSITION);
		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: canvas! });
		renderer.setSize(WIDTH, HEIGHT);

		// Load the model
		const glbLoader = new GLTFLoader();
		const glb = await glbLoader.loadAsync(asset('/purple_man_dance.glb'));
		sankkitModel = glb.scene;
		sankkitModel.scale.set(LARGE_SCALE, LARGE_SCALE, LARGE_SCALE);
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

		function onWindowResize() {
			camera.aspect = canvas!.clientWidth / canvas!.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(WIDTH, HEIGHT);
			renderer.render(scene, camera);
		}
		window.addEventListener('resize', onWindowResize, false);
	});
</script>

<div class="pointer-events-none absolute top-0 left-0 flex">
	<canvas id="model-canvas" class="overflow-hidden border-none"></canvas>
</div>
