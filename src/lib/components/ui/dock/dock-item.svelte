<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useSpring, useTransform, Motion } from 'svelte-motion';
	import type { MotionValue } from 'svelte-motion';

	let {
		containerX,
		mouseX,
		href,
		children
	}: {
		containerX: MotionValue<number>;
		mouseX: MotionValue<number>;
		href: string;
		children: Snippet;
	} = $props();

	let dockItem: HTMLDivElement;

	let distance = $derived(
		useTransform(mouseX, (val) => {
			const bounds = dockItem?.getBoundingClientRect() ?? {
				x: 0,
				width: 0,
				left: 0
			};

			const XDiffToContainerX = bounds?.x - containerX.get();

			return val - bounds?.width / 2 - XDiffToContainerX;
		})
	);

	let widthSync = $derived(useTransform(distance, [-125, 0, 125], [44, 85, 44]));
	//   Adjust stiffness and damping as per needs
	let width = $derived(useSpring(widthSync, { stiffness: 400, damping: 25 }));
</script>

<Motion
	let:motion
	style={{ width: width }}
	transition={{
		bounceDamping: 300,
		bounceStiffness: 800,
		bounce: 0.3,
		duration: 0.8
	}}
>
	<a {href}>
		<div
			role="button"
			bind:this={dockItem}
			use:motion
			class="group flex aspect-square items-center justify-center overflow-hidden rounded-full border border-neutral-800 bg-neutral-950 p-2 text-neutral-400 shadow-inner shadow-neutral-300/20 transition duration-500 hover:text-white active:-translate-y-10 active:duration-1000 active:ease-out"
		>
			{@render children()}
		</div>
	</a>
</Motion>
