<script lang="ts">
	import * as Tone from 'tone';
	import { onDestroy } from 'svelte';
	import { frequencies_just } from '$lib/note_frequencies';

	type NoteName = keyof typeof frequencies_just;
	let dropdownNoteNames: NoteName[] = ['A3','Bb3','B3','C4','C#4','D4','Eb4','E4','F4','F#4','G4','G#4','A4','Bb4','B4','C5','C#5','D5','Eb5','E5','F5','F#5','G5','G#5','A5'];

	let isPlaying = $state(false);
	let synth: Tone.Synth | null = null;
	let { note = $bindable(dropdownNoteNames[0]) }: { note?: NoteName } = $props();

	async function toggle() {
		if (isPlaying) {
			synth?.triggerRelease();
			isPlaying = false;
		} else {
			await Tone.start();
			if (!synth) {
				synth = new Tone.Synth({
					oscillator: {
						type: 'sine'
					}
				}).toDestination();
			}
			synth.triggerAttack(frequencies_just[note]);
			isPlaying = true;
		}
	}

	// Instantly update the pitch if the user changes the dropdown while playing
	$effect(() => {
		if (isPlaying && synth) {
			synth.frequency.value = frequencies_just[note];
		}
	});

	onDestroy(() => {
		if (synth) {
			synth.dispose();
		}
	});
</script>

<div class="tone-player">
	<select bind:value={note}>
		{#each dropdownNoteNames as noteName (noteName)}
			<option value={noteName}>{noteName} ({frequencies_just[noteName]} Hz)</option>
		{/each}
	</select>

	<button onclick={toggle}>
		{isPlaying ? 'Stop' : 'Play'}
	</button>
</div>

<style>
	.tone-player {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 1rem;
		margin-top: 0;
		flex: 0 0 13rem;
		width: 13rem;
		min-width: 13rem;
	}

	button, select {
		padding: 0.5rem 1rem;
		font-size: 1.2rem;
		cursor: pointer;
		width: 100%;
	}
</style>