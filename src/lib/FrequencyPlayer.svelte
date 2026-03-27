<script lang="ts">
	import * as Tone from 'tone';
	import Fa from 'svelte-fa';
	import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
	import { onDestroy } from 'svelte';
	import FrequencyImage from '$lib/FrequencyImage.svelte';

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

<div class="tone-player">
	<span class="label" title="Difference frequency">{formula} = {formatHz(frequencyHz)} Hz</span>

	<FrequencyImage frequency={frequencyHz} />

	<button onclick={toggle}>
		<Fa icon={isPlaying ? faStop : faPlay} />
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

	.label {
		font-size: 1.2rem;
		text-align: center;
	}

	button {
		padding: 0.5rem 1rem;
		font-size: 1.2rem;
		cursor: pointer;
		width: 100%;
	}
</style>
