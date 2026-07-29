<script>
	import { User, Trophy } from 'lucide-svelte';
	import Button from '../button/button.svelte';
</script>

<div class="flex flex-col p-4 pb-15">
	<h1
		class="self-start text-3xl font-semibold text-nowrap select-none md:text-6xl lg:text-7xl xl:text-8xl"
	>
		Sankkit Wilson-Hartono
	</h1>

	<h2
		class="text-stroke-small md:text-stroke -mt-4 ml-[30vw] font-pinyon text-4xl font-bold text-nowrap
		text-purple-600 select-none md:-mt-6 md:ml-[40vwß] md:text-6xl lg:-mt-8 lg:ml-[40vw] lg:text-7xl xl:-mt-9 xl:ml-[21vw] xl:text-8xl"
	>
		Software Engineer
	</h2>
</div>

<div class="justify-items-center p-2 md:w-150 md:p-8">
	<div class="flex flex-col gap-2 text-sm md:text-xl lg:text-2xl">
		<p class="w-auto text-ellipsis md:text-clip">Hi, my portfolio is current a WIP.</p>
	</div>
	<div>
		<Button variant="ghost"><User /> About</Button>
		<Button variant="ghost"><Trophy /> Experience</Button>
	</div>
</div>
