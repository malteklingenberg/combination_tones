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
	let cubicDifferenceFrequencyHz = $derived(2*lowerFreq - higherFreq);
</script>

<svelte:head>
	<title>Combination Tones</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="page">
	<h1 class="page-title">
		Combination Tones
	</h1>

	<div class="players-container">
		<NotePlayer bind:note={note1} />
		<NotePlayer bind:note={note2} />
		<FrequencyPlayer frequencyHz={differenceFrequencyHz} formula="|f1 - f2|" />
		<FrequencyPlayer frequencyHz={cubicDifferenceFrequencyHz} formula="2f1 - f2" />
	</div>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 70vh;
		width: 100%;
		padding: 2rem 1rem;
	}

	.players-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 1.5rem;
		width: 100%;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		margin: 2rem 0 0 0;
	}

	.page-title {
		margin: 0 0 1.75rem;
		width: 100%;
		text-align: center;
		font-size: clamp(2rem, 5.5vw, 3rem);
		font-weight: 300;
		letter-spacing: 0.03em;
		line-height: 1.15;
		color: var(--color-text);
		text-wrap: balance;
	}
</style>
