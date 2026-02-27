<script lang="ts">
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import './layout.css';

	let { children } = $props();
</script>

<Sidebar.Provider>
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<h1 class="text-xl font-bold">Sankkit Wilson-Hartono</h1>
			<Sidebar.Trigger class="ms-auto -me-1 rotate-180" />
		</header>
		{@render children()}
	</Sidebar.Inset>
	<AppSidebar side="right" />
</Sidebar.Provider>
