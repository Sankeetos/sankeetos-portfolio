<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	// This is sample data.
	const data = {
		navMain: [
			{
				title: 'Home',
				url: '/'
			},
			{
				title: 'About',
				url: '/'
			},
			{
				title: 'Projects',
				url: '/'
			},
			{
				title: 'Skills',
				url: '/'
			}
		]
	};
	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {...restProps}>
	<Sidebar.Content class="justify-center-safe">
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu class="gap-0">
					{#each data.navMain as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton class="text-truncate flex h-auto text-xl md:text-5xl">
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										{item.title}
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
