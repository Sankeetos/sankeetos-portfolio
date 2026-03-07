<script lang="ts">
	import { Motion, useMotionValue } from 'svelte-motion';
	import { cn } from '$lib/utils';
	import DockItem from './dock-item.svelte';
	import { menuItems } from '$lib/utils/menu.utils';
	export let side: 'top' | 'bottom' = 'bottom';
	export let className: string;
	export { className as class };

	const mouseX = useMotionValue(Infinity);
	const containerX = useMotionValue(0);

	let containerRef: HTMLDivElement;
</script>

<div class={cn(side === 'top' ? 'top-4' : 'bottom-4', className)} {...$$restProps}>
	<Motion let:motion>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			use:motion
			bind:this={containerRef}
			class="flex h-16 items-end gap-4 rounded-full border border-neutral-800 bg-neutral-950 px-3 pb-2 shadow-inner shadow-neutral-300/5"
			on:mouseleave={() => mouseX.set(Infinity)}
			on:mousemove={(e) => {
				const rect = containerRef.getBoundingClientRect();
				if (rect) {
					mouseX.set(e.clientX - rect.left);
					containerX.set(rect.x);
				}
			}}
		>
			{#each menuItems as dockItem}
				<DockItem {containerX} {mouseX} href={dockItem.href}>
					{#if dockItem?.icon}
						<svelte:component this={dockItem.icon.component} {...dockItem.icon.props} />
					{/if}
				</DockItem>
			{/each}
		</div>
	</Motion>
</div>
