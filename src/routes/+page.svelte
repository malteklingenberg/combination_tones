<script lang="ts">
	import FrequencyPlayer from '$lib/FrequencyPlayer.svelte';
	import NotePlayer from '$lib/NotePlayer.svelte';
	import { type NoteName, Temperament, getFrequency } from '$lib/frequency';

	let explainModalOpen = $state(false);
	let notePlayer2: NotePlayer;

	let note1 = $state<NoteName>('A4');
	let note2 = $state<NoteName>('C#5');
	let temperament = $state<Temperament>(Temperament.just);
	let lowerFreq = $derived(
		Math.min(getFrequency(note1, temperament), getFrequency(note2, temperament))
	);
	let higherFreq = $derived(
		Math.max(getFrequency(note1, temperament), getFrequency(note2, temperament))
	);
	let differenceFrequencyHz = $derived(Math.abs(lowerFreq - higherFreq));
	let cubicDifferenceFrequencyHz = $derived(Math.abs(2 * lowerFreq - higherFreq));

	function on_key_down(event: KeyboardEvent) {
		if (event.repeat) return;

		switch (event.key) {
			case 't':
				temperament = temperament === Temperament.just ? Temperament.equal : Temperament.just;
				event.preventDefault();
				break;

			case 'ArrowUp':
				notePlayer2.changeNote(true);
				event.preventDefault();
				break;

			case 'ArrowDown':
				notePlayer2.changeNote(false);
				event.preventDefault();
				break;
		}
	}
</script>

<svelte:window onkeydown={on_key_down} />

<svelte:head>
	<title>Combination Tones</title>
	<meta name="description" content="Interactive demonstration of combination tones" />
</svelte:head>

<section class="hero min-h-[70vh] bg-transparent">
	<div class="hero-content flex-col gap-4 px-4 py-8">
		<h1 class="text-center tracking-wide text-base-content font-header pb-8">Combination Tones</h1>

		<p>
			don't know what this is about? <button
				class="btn btn-link p-0"
				onclick={() => (explainModalOpen = true)}>click here</button
			> to learn more
		</p>

		<div class="flex w-full flex-wrap justify-center gap-x-18 gap-y-6">
			<div class="flex flex-col gap-6">
				<div class="card bg-base-100 shadow">
					<div class="card-body p-4">
						<div class="form-control w-full pl-3">
							<label class="label py-1" for="temperament-select">
								<span class="label-text">Temperament</span>
							</label>
							<select
								id="temperament-select"
								class="select select-bordered ml-3"
								bind:value={temperament}
							>
								{#each Object.values(Temperament) as temp (temp)}
									<option value={temp}>{temp.charAt(0).toUpperCase() + temp.slice(1)}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
				<div class="flex gap-6">
					<NotePlayer bind:note={note1} {temperament} />
					<NotePlayer bind:this={notePlayer2} bind:note={note2} {temperament} />
				</div>
			</div>
			<div class="flex gap-6">
				<FrequencyPlayer frequencyHz={differenceFrequencyHz} formula="|f₁ - f₂|" />
				<FrequencyPlayer frequencyHz={cubicDifferenceFrequencyHz} formula="|2f₁ - f₂|" />
			</div>
		</div>
	</div>
</section>

<dialog
	class="modal"
	class:modal-open={explainModalOpen}
	onclick={() => (explainModalOpen = false)}
>
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<div class="modal-box w-11/12 max-w-5xl" onclick={(e) => e.stopPropagation()}>
		<h2 class="text-xl font-bold">Hello!</h2>
		<p class="py-4 text-sm">
			This is a demonstration of the acoustic phenomenon of <i>combination tones</i>. When two notes
			of different frequencies are played, nonlinearities in the ear, but also in electronic
			speakers and elsewhere generate additional frequencies, which can be heard as extra notes.
		</p>

		<p class="py-4 text-sm">
			<b>Cool! How do I use it?</b><br />
			Select two notes on the left. The resulting combination tones are displayed on the right. Play the
			notes you selected using the play buttons below them and try to hear the combination tones. If you
			are having trouble discerning them, you can play the combination tones to give you a hint of what
			to listen out for. You can also switch between just intonation (intervals based on the harmonic
			series) and equal temperament using the dropdown menu at the top.
		</p>

		<p class="py-4 text-sm">
			<b>What's up with the cent symbol?</b><br />
			Sometimes, the combination tones don't align nicely with the scale notes in just intonation. The
			number below the note gives the size of that deviation: a negative value means that the combination
			tone is lower than the displayed note, while a positive value means it is higher. The deviation
			is given in cents, where 1200 cents is an octave and 100 cents an equal-tempered semitone. Note
			that even if you select equal temperament, the deviation given always refers to the displayed note
			in just intonation.
		</p>

		<p class="py-4 text-sm">
			<b>Which frequency ratios did you use to define the just intervals?</b><br />
			Where possible, I've used the frequency ratios of neighbouring notes on the harmonic series: for
			the minor second (16:15), major second (9:8), minor third (6:5), major third (5:4), perfect fourth
			(4:3), perfect fifth (3:2). The minor sixth (8:5), major sixth (5:3) and major seventh (15:8) are
			also taken directly from the harmonic series. For the minor seventh and augmented fourth/diminished
			fifth, several definitions are common. I've chosen to define the minor seventh as a minor third
			above a perfect fifth (9:5), and the diminished fifth as a perfect fourth above a minor second (64:45).
		</p>

		<p class="py-4 text-sm">
			<b>I'm looking at this on my phone, and it all looks a bit squished and odd!</b><br />
			Well, go look at it on a landscape screen instead. I might make this app properly responsive if
			I find the time.
		</p>

		<div class="container py-4 min-w-full flex flex-col items-center">
			<button class="btn btn-primary" onclick={() => (explainModalOpen = false)}>Got it!</button>
		</div>
	</div>
</dialog>
