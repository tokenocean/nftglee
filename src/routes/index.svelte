<script context="module">
  export async function load({ fetch }) {
    const props = await fetch(`/artworks/recent.json`).then((r) => r.json());

    return {
      props,
    };
  }
</script>

<script>
  import { onMount, onDestroy } from "svelte";
  import { query } from "$lib/api";
  import { Summary } from "$comp";
  import { fade } from "svelte/transition";
  import { user } from "$lib/store";
  import { Activity, RecentActivityCard, LatestPiecesCard } from "$comp";
  import { err } from "$lib/utils";
  import branding from "$lib/branding";
  import { prefetch } from "$app/navigation";
  import { browser } from "$app/env";

  onMount(() => browser && prefetch("/market"));
</script>

<div class="flex mx-auto justify-center">
  <div class="header mt-10 md:mt-20 text-center text-2xl">
    <h1 class="mb-10 text-center w-full">Discover, Collect, & Sell.</h1>
    <p class="md:max-w-md mx-auto text-center">Curated NFT Platform.</p>
    <p class="md:max-w-md mx-auto text-center">Art, Access + Utility NFTs.</p>
    <p class="md:max-w-md mx-auto text-center">Minted on Bitcoin. Low Fees.</p>
    <div class="mt-10 relative">
      <a class="edgtf-btn bg-black text-white px-20 py-2" href="/market">
        <span>Enter</span>
      </a>
      <img
        src="/greencrypto.png"
        class="w-52 lg:absolute mx-auto py-10 bottom-4 xl:-bottom-8 right-16"
        alt="Green Crypto"
      />
    </div>
  </div>
</div>

<div class="flex secondary-header mt-20 mb-20 text-white">
  <video
    class="lazy cover absolute secondary-header"
    autoplay
    muted
    playsinline
    loop
  >
    <source src="/bob.mp4" />
    Your browser does not support HTML5 video.
  </video>
</div>


<style>
  .header {
    width: 90%;
    margin-top: 128px;
  }

  .secondary-header {
    height: 600px !important;
    width: 100%;
    object-fit: cover;
  }

  @media only screen and (max-width: 768px) {
    .header {
      margin-top: 64px;
    }

    .secondary-header {
      height: 400px !important;
    }
  }

</style>
