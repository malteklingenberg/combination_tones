<script lang="ts">
	import * as Tone from 'tone';
	import { onDestroy } from 'svelte';
	import { frequencies_just } from './note_frequencies';

	type NoteName = keyof typeof frequencies_just;

	let isPlaying = $state(false);
	let synth: Tone.Synth | null = null;
	let { note = $bindable(Object.keys(frequencies_just)[0] as NoteName) }: { note?: NoteName } = $props();

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
		{#each Object.keys(frequencies_just) as noteName (noteName)}
			<option value={noteName}>{noteName} ({frequencies_just[noteName as NoteName]} Hz)</option>
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