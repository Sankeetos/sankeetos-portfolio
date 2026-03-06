<script lang="ts">
	import { Motion, useMotionValue } from 'svelte-motion';
	import { cn } from '$lib/utils';
	import DockItem from './dock-item.svelte';
	import { User, House, MonitorIcon, LibraryBig, Camera } from 'lucide-svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	type DockItem = {
		id: string;
		label: string;
		icon?: {
			component: any;
			props?: Record<string, any>;
		};
		href: string;
	};

	const icons: Record<string, DockItem['icon']> = {
		homeIcon: {
			component: House,
			props: {
				size: 32
			}
		},
		aboutIcon: {
			component: User,
			props: {
				size: 32
			}
		},
		projectsIcon: {
			component: MonitorIcon,
			props: {
				size: 32
			}
		},
		skillsIcon: {
			component: LibraryBig,
			props: {
				size: 32
			}
		},
		cameraIcon: {
			component: Camera,
			props: {
				size: 32
			}
		}
	};

	export let side: 'top' | 'bottom' = 'bottom';
	export let className: string;
	export { className as class };
	export const items: DockItem[] = [
		{ id: '1', label: 'Home', icon: icons['homeIcon'], href: '/' },
		{ id: '2', label: 'About', icon: icons['aboutIcon'], href: '/test' },
		{ id: '3', label: 'Projects', icon: icons['projectsIcon'], href: '/foo' },
		{ id: '4', label: 'Skills', icon: icons['skillsIcon'], href: '/' },
		{ id: '5', label: 'Photos', icon: icons['cameraIcon'], href: '/' }
	];

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
			{#each items as dockItem}
				<DockItem {containerX} {mouseX} href={dockItem.href}>
					{#if dockItem?.icon}
						<svelte:component this={dockItem.icon.component} {...dockItem.icon.props} />
					{/if}
				</DockItem>
			{/each}
		</div>
	</Motion>
</div>
