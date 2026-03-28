<script lang="ts">
	import FrequencyPlayer from '$lib/FrequencyPlayer.svelte';
	import NotePlayer from '$lib/NotePlayer.svelte';
	import { frequencies_just } from '$lib/note_frequencies';

	type NoteName = keyof typeof frequencies_just;

	let note1 = $state<NoteName>('A4');
	let note2 = $state<NoteName>('C#5');
	let lowerFreq = $derived(Math.min(frequencies_just[note1], frequencies_just[note2]));
	let higherFreq = $derived(Math.max(frequencies_just[note1], frequencies_just[note2]));
	let differenceFrequencyHz = $derived(Math.abs(lowerFreq - higherFreq));
	let cubicDifferenceFrequencyHz = $derived(2 * lowerFreq - higherFreq);
</script>

<svelte:head>
	<title>Combination Tones</title>
	<meta name="description" content="Interactive demonstration of combination tones" />
</svelte:head>

<section class="hero min-h-[70vh] bg-transparent">
	<div class="hero-content flex-col gap-8 px-4 py-8">
		<h1 class="text-center text-5xl tracking-wide text-base-content">Combination Tones</h1>

		<div class="flex w-full flex-wrap justify-center gap-x-18 gap-y-6">
			<div class="flex gap-6">
				<NotePlayer bind:note={note1} />
				<NotePlayer bind:note={note2} />
			</div>
			<div class="flex gap-6">
				<FrequencyPlayer frequencyHz={differenceFrequencyHz} formula="|f₁ - f₂|" />
				<FrequencyPlayer frequencyHz={cubicDifferenceFrequencyHz} formula="2f₁ - f₂" />
			</div>
		</div>
	</div>
</section>
