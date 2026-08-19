<script lang="ts">
	import './layout.css';
	import { ModeWatcher } from 'mode-watcher';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { DEFAULT_MOBILE_BREAKPOINT } from '$lib/components/ui/sankkit-model/constants';

	let innerWidth = $state(0);
	onMount(() => {
		innerWidth = window.innerWidth;
		const handleResize = () => (innerWidth = window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	const SMALL_ICON_SIZE = 25;
	const DEFAULT_ICON_SIZE = 30;

	let iconSize = $derived(
		innerWidth < DEFAULT_MOBILE_BREAKPOINT ? SMALL_ICON_SIZE : DEFAULT_ICON_SIZE
	);

	let { children } = $props();
</script>

<ModeWatcher />
<div>
	{@render children()}
</div>

<footer
	class="footer fixed inset-x-0 bottom-5 flex w-full flex-col items-center justify-center gap-2 md:flex-row md:justify-between md:px-10"
>
	<div class="flex flex-col items-center gap-0 text-sm md:flex-row md:gap-2">
		<p class="font-pinyon font-bold">Sankkit Wilson-Hartono</p>
		<p class="hidden md:block">|</p>
		<p>© 2026 - All rights reserved</p>
	</div>

	<div class="flex gap-4">
		<a href="https://github.com/Sankeetos" aria-label="GitHub">
			<Icon
				icon="mdi:github"
				width={iconSize}
				height={iconSize}
				class="transition-colors hover:text-purple-300"
			/>
		</a>
		<a href="https://www.linkedin.com/in/sankkit-wilson-hartono/" aria-label="LinkedIn">
			<Icon
				icon="mdi:linkedin"
				width={iconSize}
				height={iconSize}
				class="transition-colors hover:text-blue-500"
			/>
		</a>
		<a href="https://instagram.com/sankkit" aria-label="Instagram">
			<Icon
				icon="mdi:instagram"
				width={iconSize}
				height={iconSize}
				class="transition-colors hover:text-pink-700"
			/>
		</a>
	</div>
</footer>
