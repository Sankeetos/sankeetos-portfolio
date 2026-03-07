<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	import { menuItems } from '$lib/utils/menu.utils';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {...restProps}>
	<Sidebar.Content class="justify-center-safe">
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu class="gap-0">
					{#each menuItems as item (item.label)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton class="text-truncate flex h-auto text-xl md:text-5xl">
								{#snippet child({ props })}
									<a href={item.href} {...props}>
										{item.label}
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
