<script lang="ts">
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import './layout.css';
	import * as Kbd from '$lib/components/ui/kbd/index.js';
	import { DarkModeButton } from '$lib/components';
	import { ModeWatcher } from 'mode-watcher';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { Dock } from '$lib/components/ui/dock/index.js';

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
						<Kbd.Root>Ctrl + B</Kbd.Root>
					</Kbd.Group>
					<Sidebar.Trigger class="ms-auto -me-1 rotate-180" />
				</div>
			</div>
		</header>
		<div class="pt-10 md:pl-10">
			{@render children()}
		</div>
	</Sidebar.Inset>
	<AppSidebar side="right" />
</Sidebar.Provider>

<Dock class="bottom:0 fixed flex place-self-center" />
