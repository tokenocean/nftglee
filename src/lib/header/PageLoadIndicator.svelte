<script>
	import { onDestroy, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	const navigationState = writable();
	const progress = tweened(0, {
		duration: 3500,
		easing: cubicOut
	});
  
	const unsubscribe = navigationState.subscribe((state) => {
		//console.log("The loading state is", state);
		if (state === 'loading-with-progress-bar') {
			progress.set(0, { duration: 0 });
			progress.set(0.8, { duration: 5000 });
		} else if (state === 'loaded') {
			progress.set(1, { duration: 1000 });
		}
	});
	onMount(() => {
		progress.set(0.7);
	});
	onDestroy(() => {
		unsubscribe();
	});
</script>

<!-- Documentation of special SvelteKit events here https://kit.svelte.dev/docs#events -->
<svelte:window
	on:sveltekit:navigation-start={() => {

		// If the page loads fast enough in the preloading state, don't display the progress bar
		$navigationState = 'preloading';

        // Delay the progress bar to become visible only show if the page load takes too long
        setTimeout(function() {
			      // After 250ms switch preloading to loading-with-progress-bar
            if($navigationState === 'preloading') {
                $navigationState = 'loading-with-progress-bar';
            }
        }, 500);
	}}
	on:sveltekit:navigation-end={() => {
		$navigationState = 'loaded';
	}}
/>

<!--
	Make sure the container component is always in the DOM structure.
	If we make changes to the page structure during the navigation, we get a page double render error:
	https://stackoverflow.com/questions/70051025/sveltekit-adds-new-page-on-top-of-old-one
	Thus, make sure any progress animation is done using CSS only.
-->
<div class="page-progress-bar" class:loaded={$navigationState === 'loaded'} class:preloading={$navigationState === 'preloading'} class:loading={$navigationState === 'loading-with-progress-bar'}>
	<div class="progress-sliver" style={`--width: ${$progress * 100}%`} />
</div>

<style>
	 /* Always stay fixed at the top, but stay transparent if no activity is going on */
	.page-progress-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 0.5rem;
		background: transparent;
		z-index: 100;
		opacity: 0;
		transition: opacity 0.5s;
	}
	 /* After transitioning from preloading to loading state, make the progress bar visible with CSS transition on opacity */
	.page-progress-bar.loading {
		opacity: 1;
		transition: opacity 0.5s;
	}
	.progress-sliver {
		width: var(--width);
		background-color: green;
		height: 100%;
	}
</style>