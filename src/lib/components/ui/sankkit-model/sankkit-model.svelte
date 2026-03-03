<script lang="ts">
	import * as THREE from 'three';
	import { onMount } from 'svelte';
	import { ASPECT_RATIO, FOV } from './constants';
	import type { ClassValue } from 'tailwind-variants';
	import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
	// import model from '/sankkit.glb';

	let props: { class?: ClassValue } = $props();

	onMount(() => {
		let loader = new GLTFLoader();
		let scene: THREE.Scene;
		let camera: THREE.PerspectiveCamera;
		let renderer: THREE.WebGLRenderer;
		let cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;

		function init() {
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, 0.1, 1000);

			renderer = new THREE.WebGLRenderer({
				canvas: document.querySelector('#sankkit-model') as HTMLCanvasElement
			});
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(renderer.domElement);

			const geometry = new THREE.BoxGeometry(1, 1, 1);
			const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
			cube = new THREE.Mesh(geometry, material);

			loader.load('/sankkit.glb', function (glb) {
				scene.add(glb.scene);
			});

			camera.position.z = 5;
		}

		function render() {
			renderer.clear();
			renderer.render(scene, camera);
		}

		function animate() {
			requestAnimationFrame(animate);

			cube.rotation.x += 0.005;
			cube.rotation.y += 0.005;

			render();
		}

		init();
		animate();
	});
</script>

<canvas id="sankkit-model" class={['original', props.class]}></canvas>
