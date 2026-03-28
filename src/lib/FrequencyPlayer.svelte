<script lang="ts">
	import * as Tone from 'tone';
	import Fa from 'svelte-fa';
	import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
	import { onDestroy } from 'svelte';
	import FrequencyImage from '$lib/FrequencyImage.svelte';

	let isPlaying = $state(false);
	let synth: Tone.Synth | null = null;
	let { frequencyHz, formula }: { frequencyHz: number; formula: string } = $props();

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
		// return hz < 100 ? hz.toFixed(2) : hz.toFixed(1);
		return hz.toFixed(2);
	}
</script>

<div class="card card-border w-56 shrink-0 shadow-xl glass">
	<div class="card-body gap-4">
		<h2
			class="card-title m-0 flex h-[calc(var(--size-field,0.25rem)*10)] w-full shrink-0 items-center justify-center text-center text-lg leading-none"
			title="Difference frequency"
		>
			{formula} = {formatHz(frequencyHz)} Hz
		</h2>

		<FrequencyImage frequency={frequencyHz} />

		<button class="btn btn-primary w-full" type="button" onclick={toggle}>
			<Fa icon={isPlaying ? faStop : faPlay} />
		</button>
	</div>
</div>
