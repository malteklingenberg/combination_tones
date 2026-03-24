<script lang="ts">
	import FrequencyPlayer from './FrequencyPlayer.svelte';
	import NotePlayer from './NotePlayer.svelte';
	import { frequencies_just } from './note_frequencies';

	type NoteName = keyof typeof frequencies_just;

	let note1 = $state<NoteName>('A4');
	let note2 = $state<NoteName>('C#5');
	let differenceFrequencyHz = $derived(Math.abs(frequencies_just[note1] - frequencies_just[note2]));
	let cubicDifferenceFrequencyHz = $derived(2*frequencies_just[note1] - frequencies_just[note2]);
</script>

<svelte:head>
	<title>Combination Tones</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1 class="page-title">
		Combination Tones
	</h1>

	<NotePlayer bind:note={note1} />
	<NotePlayer bind:note={note2} />
	<FrequencyPlayer frequencyHz={differenceFrequencyHz} formula="|f1 - f2|" />
	<FrequencyPlayer frequencyHz={cubicDifferenceFrequencyHz} formula="2f1 - f2" />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
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
