<script lang="ts">
	import { asset } from '$app/paths';
	import { frequencies_just } from '$lib/note_frequencies';
	import type { NoteName } from '$lib/frequency';

	let { frequency }: { frequency: number } = $props();

	let closestNote = $state<NoteName | null>(null);
	let closestDiffCents = $state<number | null>(null);

	$effect(() => {
		let bestNote: NoteName | null = null;
		let bestDiff = Infinity;

		for (const [noteName, freq] of Object.entries(frequencies_just) as [NoteName, number][]) {
			const diff = Math.log2(frequency / freq);
			if (Math.abs(diff) < bestDiff) {
				bestDiff = diff;
				bestNote = noteName;
			}
		}
		closestDiffCents = bestDiff * 1200;
		closestNote = bestNote;
	});
</script>

{#if frequency <= 0}
	<img class="mx-auto block w-4/5" src={asset(`/note_images/0.png`)} alt="(0 or negative)" />
	<p class="-mt-4 text-center text-2xl text-base-content">&nbsp;</p>
{:else if closestNote !== null && closestDiffCents != null}
	<img
		class="mx-auto block w-4/5"
		src={asset(`/note_images/${closestNote.replace('#', 's')}.png`)}
		alt={`${closestNote}`}
	/>
	<p class="-mt-4 text-center text-2xl text-base-content">
		{closestDiffCents >= 0 ? '+' : ''}{closestDiffCents.toFixed(1)}¢
	</p>
{/if}
