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
		camera.position.y = 2;

		const canvas = document.querySelector('#c');
		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas });
		renderer.setSize(w, h);
		document.body.appendChild(renderer.domElement);

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
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}
		window.addEventListener('resize', handleWindowResize, false);
	});
</script>

<canvas id="c"></canvas>
