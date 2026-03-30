<script lang="ts">
	import * as Tone from 'tone';
	import Fa from 'svelte-fa';
	import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
	import { onDestroy } from 'svelte';
	import { type NoteName, Temperament, getFrequency } from '$lib/frequency';
	import FrequencyImage from '$lib/FrequencyImage.svelte';


	let dropdownNoteNames: NoteName[] = [
		'A3',
		'Bb3',
		'B3',
		'C4',
		'C#4',
		'D4',
		'Eb4',
		'E4',
		'F4',
		'F#4',
		'G4',
		'G#4',
		'A4',
		'Bb4',
		'B4',
		'C5',
		'C#5',
		'D5',
		'Eb5',
		'E5',
		'F5',
		'F#5',
		'G5',
		'G#5',
		'A5'
	];

	let isPlaying = $state(false);
	let synth: Tone.Synth | null = null;
	let { note = $bindable(), temperament }: { note: NoteName, temperament: Temperament } = $props();

	export function changeNote(up: boolean) {
		const index = dropdownNoteNames.indexOf(note);
		if (up && index < dropdownNoteNames.length - 1) {
			note = dropdownNoteNames[index + 1];
		} else if (!up && index > 0) {
			note = dropdownNoteNames[index - 1];
		}
	}

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
			synth.triggerAttack(getFrequency(note, temperament));
			isPlaying = true;
		}
	}

	// instantly update the pitch if the user changes the dropdown while playing
	$effect(() => {
		if (isPlaying && synth) {
			synth.frequency.value = getFrequency(note, temperament);
		}
	});

	onDestroy(() => {
		if (synth) {
			synth.dispose();
		}
	});
</script>

<div class="card card-border bg-base-100 w-56 shrink-0 shadow-xl">
	<div class="card-body gap-4 p-4">
		<select class="select select-ghost select-primary w-full text-lg" bind:value={note}>
			{#each dropdownNoteNames as noteName (noteName)}
				<option value={noteName}>{noteName} ({getFrequency(noteName, temperament)} Hz)</option>
			{/each}
		</select>

		<FrequencyImage frequency={getFrequency(note, temperament)} />

		<button class="btn btn-primary w-full" type="button" onclick={toggle}>
			<Fa icon={isPlaying ? faStop : faPlay} />
		</button>
	</div>
</div>
