<script lang="ts">
	import FrequencyPlayer from '$lib/FrequencyPlayer.svelte';
	import NotePlayer from '$lib/NotePlayer.svelte';
	import { type NoteName, Temperament, getFrequency } from '$lib/frequency';

	let explainModalOpen = $state(false);
	let notePlayer2: NotePlayer;

	let note1 = $state<NoteName>('A4');
	let note2 = $state<NoteName>('C#5');
	let temperament = $state<Temperament>(Temperament.just);
	let lowerFreq = $derived(Math.min(getFrequency(note1, temperament), getFrequency(note2, temperament)));
	let higherFreq = $derived(Math.max(getFrequency(note1, temperament), getFrequency(note2, temperament)));
	let differenceFrequencyHz = $derived(Math.abs(lowerFreq - higherFreq));
	let cubicDifferenceFrequencyHz = $derived(2 * lowerFreq - higherFreq);

	function on_key_down(event: KeyboardEvent) {
		if (event.repeat) return;

		switch (event.key) {
			case "t":
				temperament = temperament === Temperament.just ? Temperament.equal : Temperament.just;
				event.preventDefault();
				break;
			
			case "ArrowUp":
				notePlayer2.changeNote(true);
				event.preventDefault();
				break;
			
			case "ArrowDown":
				notePlayer2.changeNote(false);
				event.preventDefault();
				break;
		}
	}
</script>

<svelte:window
    on:keydown={on_key_down}
/>

<svelte:head>
	<title>Combination Tones</title>
	<meta name="description" content="Interactive demonstration of combination tones" />
</svelte:head>

<section class="hero min-h-[70vh] bg-transparent">
	<div class="hero-content flex-col gap-8 px-4 py-8">
		<h1 class="text-center text-5xl tracking-wide text-base-content">Combination Tones</h1>
		
		<p>
			<button class="btn btn-link p-0" onclick={ () => explainModalOpen = true }>click here</button>
			for an explanation of what this is
		</p>
		
		<div class="flex w-full flex-wrap justify-center gap-x-18 gap-y-6">
			<div class="flex flex-col gap-6">
				<div class="card bg-base-100 shadow">
					<div class="card-body p-4">
						<div class="form-control w-full pl-3">
							<label class="label py-1" for="temperament-select">
								<span class="label-text">Temperament</span>
							</label>
							<select id="temperament-select" class="select select-bordered ml-3" bind:value={temperament}>
								{#each Object.values(Temperament) as temp (temp)}
									<option value={temp}>{temp.charAt(0).toUpperCase() + temp.slice(1)}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
				<div class="flex gap-6">
					<NotePlayer bind:note={note1} temperament={temperament} />
					<NotePlayer bind:this={notePlayer2} bind:note={note2} temperament={temperament} />
				</div>
			</div>
			<div class="flex gap-6">
				<FrequencyPlayer frequencyHz={differenceFrequencyHz} formula="|f₁ - f₂|" />
				<FrequencyPlayer frequencyHz={cubicDifferenceFrequencyHz} formula="2f₁ - f₂" />
			</div>
		</div>
	</div>
</section>

<dialog class="modal" class:modal-open={explainModalOpen} onclick={() => (explainModalOpen = false)}>
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<div class="modal-box w-11/12 max-w-5xl" onclick={e => e.stopPropagation()}>
		<h3 class="text-lg font-bold">Hello!</h3>
		<p class="py-4">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
		<p class="py-4">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
		<p class="py-4">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
		<p class="py-4">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
	</div>
</dialog>