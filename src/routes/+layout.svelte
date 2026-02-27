<script lang="ts">
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import './layout.css';
	import * as Kbd from '$lib/components/ui/kbd/index.js';
	let { children } = $props();
</script>

<Sidebar.Provider open={false}>
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2 px-4 pl-10">
			<h1 class="text-4xl font-bold">Sankkit Wilson-Hartono</h1>
			<div class="ms-auto flex items-center">
				<Kbd.Group>
					<Kbd.Root>Ctrl + B</Kbd.Root>
				</Kbd.Group>
				<Sidebar.Trigger class="ms-auto -me-1 rotate-180" />
			</div>
		</header>
		<div class="pt-5 pl-10">
			{@render children()}
		</div>
	</Sidebar.Inset>
	<AppSidebar side="right" />
</Sidebar.Provider>
