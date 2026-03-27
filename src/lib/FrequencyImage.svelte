<script lang="ts">
	import { asset } from '$app/paths';
	import { frequencies_just } from '$lib/note_frequencies';

	type NoteName = keyof typeof frequencies_just;

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

{#if frequency === 0}
	<img src={asset(`/note_images/0.png`)} alt="(frequency is 0)" />
	<p class="diff-cents">&nbsp;</p>

{:else if closestNote !== null && closestDiffCents != null }
	<img src={asset(`/note_images/${closestNote.replace('#', 's')}.png`)} alt={`${closestNote}`} />
	<p class="diff-cents">
		{closestDiffCents >= 0 ? '+' : ''}{closestDiffCents.toFixed(1)}¢
	</p>

{/if}

<style>
	.diff-cents {
		margin: -1rem auto 0;
		font-size: 1.6rem;
		text-align: center;
	}

	img {
		width: 80%;
		align-self: center;
	}
</style>

