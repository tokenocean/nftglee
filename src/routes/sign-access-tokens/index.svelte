<script>
  import { Psbt } from "liquidjs-lib";
  import { psbt } from "$lib/store";
  import psbts from "$lib/psbts";
  import { requirePassword } from "$lib/auth";
  import { info } from "$lib/utils";
  import { sign } from "$lib/wallet";
  import { updateArtwork } from "$queries/artworks";
  import { query } from "$lib/api";

  let sleep = (n) => new Promise((r) => setTimeout(r, n));
  let query = `mutation ($artwork: artworks_set_input!, $asset: String!) {
    update_artworks(where: {asset: {_eq: $asset}}, _set: $artwork) {
      id
    }
  }`;

  let i;
  let go = async () => {
    await requirePassword();

    for (i = 0; i < psbts.length; i++) {
      let { asset, psbt: base64 } = psbts[i];
      $psbt = Psbt.fromBase64(base64);
      $psbt = await sign(0x83);
      await sleep(100);
      try {
        $psbt = await requestSignature($psbt);

        query(updateArtwork, {
          artwork: { list_price_tx: $psbt.toBase64() },
          asset,
        });
      } catch (e) {
        console.log(`Couldn't get server signature: ${e.message}`);
      }
    }
  };

</script>

<div class="container mx-auto px-10 mt-16 max-w-4xl">
  {#if i}
    <div>Signed</div>
    {i}
    /
    {psbts.length}
  {:else}
    <div>Create listing transactions for {psbts.length} tokens</div>
    <button class="primary-btn" on:click={go}>Go</button>
  {/if}
</div>
