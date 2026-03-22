<script lang="ts">
	import * as Tone from 'tone';
	import { onDestroy } from 'svelte';

	let { note } = $props();
	let isPlaying = $state(false);
	let synth: Tone.Synth | null = null;

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
			synth.triggerAttack(note);
			isPlaying = true;
		}
	}

	onDestroy(() => {
		if (synth) {
			synth.dispose();
		}
	});
</script>

<button onclick={toggle}>
	{isPlaying ? 'Stop' : 'Play'} {note}
</button>

<style>
	button {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		font-size: 1.2rem;
		cursor: pointer;
	}
</style>