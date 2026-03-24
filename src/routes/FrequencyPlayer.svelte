<script lang="ts">
	import * as Tone from 'tone';
	import { onDestroy } from 'svelte';

	let isPlaying = $state(false);
	let synth: Tone.Synth | null = null;
	let { frequencyHz, formula }: { frequencyHz: number, formula: string } = $props();

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
			synth.triggerAttack(frequencyHz);
			isPlaying = true;
		}
	}

	$effect(() => {
		if (isPlaying && synth) {
			synth.frequency.value = frequencyHz;
		}
	});

	onDestroy(() => {
		if (synth) {
			synth.dispose();
		}
	});

	function formatHz(hz: number): string {
		return hz < 100 ? hz.toFixed(2) : hz.toFixed(1);
	}
</script>

<div class="tone-player mean-tone-player">
	<span class="label" title="Difference frequency">{formula} = {formatHz(frequencyHz)} Hz</span>

	<button onclick={toggle}>
		{isPlaying ? 'Stop' : 'Play'}
	</button>
</div>

<style>
	.tone-player {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 1rem;
	}

	.mean-tone-player .label {
		font-size: 1.2rem;
		min-width: 12rem;
	}

	button {
		padding: 0.5rem 1rem;
		font-size: 1.2rem;
		cursor: pointer;
	}
</style>
