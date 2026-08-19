<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<div class="fixed flex h-full w-full content-center items-center justify-center gap-4">
	<p class="font-pinyon text-6xl font-semibold">Error</p>
	<button class="justify-center text-6xl hover:underline">
		<a href={resolve('/')}>
			{page.status}
		</a>
	</button>
</div>
