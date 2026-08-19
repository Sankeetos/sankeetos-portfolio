<script lang="ts">
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/Addons.js';
	import { FOV, LARGE_SCALE, DEFAULT_POSITION } from './constants';
	import { onMount, onDestroy } from 'svelte';
	import { asset } from '$app/paths';

	let canvasEl: HTMLCanvasElement;
	let sankkitModel: THREE.Group<THREE.Object3DEventMap>;

	onMount(async () => {
		const scene = new THREE.Scene();
		const canvas = canvasEl;

		const getSize = () => {
			const rect = canvas.getBoundingClientRect();
			return { width: rect.width, height: rect.height };
		};

		const { width, height } = getSize();

		const camera = new THREE.PerspectiveCamera(FOV, width / height, 0.1, 80);
		camera.position.z = 2;
		camera.position.y = 1.4;
		camera.lookAt(DEFAULT_POSITION);

		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		// The `false` here is important: it stops three.js from writing inline  width/height styles onto the canvas.
		renderer.setSize(width, height, false);

		// Load the model
		const glbLoader = new GLTFLoader();
		const glb = await glbLoader.loadAsync(asset('/purple_man_dance.glb'));
		sankkitModel = glb.scene;
		sankkitModel.scale.set(LARGE_SCALE, LARGE_SCALE, LARGE_SCALE);
		scene.add(sankkitModel);

		const mixer = new THREE.AnimationMixer(sankkitModel);
		const action = mixer.clipAction(glb.animations[0], sankkitModel);
		action.play();

		const timer = new THREE.Timer();
		timer.connect(document); // uses the Page Visibility API to avoid a huge delta on tab switch
		let frameId: number;

		function animate(timestamp: number) {
			frameId = requestAnimationFrame(animate);
			timer.update(timestamp);
			mixer.update(timer.getDelta());
			renderer.render(scene, camera);
		}
		frameId = requestAnimationFrame(animate);

		function onResize() {
			const { width, height } = getSize();
			if (width === 0 || height === 0) return;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height, false);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		}

		// ResizeObserver catches container/layout resizes too, not just
		// window resizes (e.g. a sidebar toggling, a flex reflow).
		const resizeObserver = new ResizeObserver(onResize);
		resizeObserver.observe(canvas);

		onDestroy(() => {
			cancelAnimationFrame(frameId);
			resizeObserver.disconnect();
			timer.disconnect();
			renderer.dispose();
		});
	});
</script>

<div class="pointer-events-none absolute top-0 left-0 h-full w-full">
	<canvas bind:this={canvasEl} class="h-full w-full overflow-hidden border-none"></canvas>
</div>
