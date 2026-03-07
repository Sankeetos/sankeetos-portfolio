<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="fixed top-0 left-0 flex h-full w-full content-center items-center justify-center">
	<p class="font-pinyon text-6xl font-semibold">Error</p>
	<Button variant="link" class="justify-center text-6xl" href="/">
		{page.status}
	</Button>
</div>
