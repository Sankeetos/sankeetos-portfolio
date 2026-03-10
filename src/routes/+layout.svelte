<script lang="ts">
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import './layout.css';
	import * as Kbd from '$lib/components/ui/kbd/index.js';
	import { DarkModeButton } from '$lib/components';
	import { ModeWatcher } from 'mode-watcher';
	import { isMacOS } from '$lib/utils/os.utils';
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

<Sidebar.Provider open={false}>
	<Sidebar.Inset>
		<header class="fixed flex h-16 shrink-0 items-center gap-2 place-self-end px-4 pl-10">
			<div class="ms-auto flex items-center gap-3">
				<DarkModeButton />
				<div class="flex items-center">
					<Kbd.Group class="hidden md:block">
						{#if isMacOS()}
							<Kbd.Root>⌘ + B</Kbd.Root>
						{:else}
							<Kbd.Root>Ctrl + B</Kbd.Root>
						{/if}
					</Kbd.Group>
					<Sidebar.Trigger class="ms-auto -me-1 rotate-180" />
				</div>
			</div>
		</header>
		<div class="pt-10 md:pl-5">
			{@render children()}
		</div>
	</Sidebar.Inset>
	<AppSidebar side="right" />
</Sidebar.Provider>

<footer
	class="footer fixed inset-x-0 bottom-5 flex w-full flex-col items-center justify-center gap-2 md:flex-row md:justify-between md:px-10"
>
	<div class="flex flex-col items-center gap-0 text-sm md:flex-row md:gap-2">
		<p class="font-pinyon font-bold">Sankkit Wilson-Hartono</p>
		<p class="hidden md:block">|</p>
		<p>© 2026 - All rights reserved</p>
	</div>

	<div class="flex gap-4">
		<a href="https://github.com" aria-label="GitHub">
			<Icon
				icon="mdi:github"
				width={iconSize}
				height={iconSize}
				class="transition-colors hover:text-purple-300"
			/>
		</a>
		<a href="https://linkedin.com" aria-label="LinkedIn">
			<Icon
				icon="mdi:linkedin"
				width={iconSize}
				height={iconSize}
				class="transition-colors hover:text-blue-500"
			/>
		</a>
		<a href="https://instagram.com" aria-label="Instagram">
			<Icon
				icon="mdi:instagram"
				width={iconSize}
				height={iconSize}
				class="transition-colors hover:text-pink-700"
			/>
		</a>
	</div>
</footer>
