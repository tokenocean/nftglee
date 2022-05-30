<script context="module">
  import { prerendering } from "$app/env";
  import { get } from "$lib/api";
  import "../main.css";

  export async function load({ fetch, url, session }) {
    if (prerendering)
      return {
        props: {
          popup: null,
        },
      };

    const props = await get(`/announcements.json`, fetch);

    if (
      session &&
      session.user &&
      !session.user.wallet_initialized &&
      !["/wallet", "/logout"].find((p) => url.pathname.includes(p))
    )
      return {
        status: 302,
        redirect: "/wallet/setup",
      };

    return {
      props,
    };
  }
</script>

<script>
  import { browser } from "$app/env";
  import { page, session } from "$app/stores";
  import decode from "jwt-decode";
  import { Sidebar, Navbar, Dialog, Footer, Snack, Head } from "$comp";
  import PageLoadIndicator from "$lib/header/PageLoadIndicator.svelte";
  import {
    meta,
    popup as p,
    password,
    prompt,
    poll,
    user,
    token,
  } from "$lib/store";
  import { onDestroy, onMount } from "svelte";
  import branding from "$lib/branding";
  import { checkAuthFromLocalStorage } from "$lib/auth";

  export let popup;
  let unsubscribeFromSession;
  let refreshInterval;
  let authCheckInterval;

  let refresh = async () => refresh = async () => {
    try {
      let { jwt_token } = await get("/auth/refresh.json", fetch);
      $token = jwt_token;
    } catch (e) {
      console.log(e);
    }
  };

  let authCheck = async () => {
    try {
      if ($session && $session.user) {
        checkAuthFromLocalStorage($session.user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (browser) {
    history.pushState = new Proxy(history.pushState, {
      apply(target, thisArg, argumentsList) {
        Reflect.apply(target, thisArg, argumentsList);
        scrollTo(0, 0);
      },
    });

    $p = popup;
    $user = $session.user;
    $token = $session.jwt;

    refreshInterval = setInterval(refresh, 720000);
    authCheckInterval = setInterval(authCheck, 5000);

    unsubscribeFromSession = session.subscribe((value) => {
      value && value.user && checkAuthFromLocalStorage(value.user);
    });
  }

  let open = false;
  let y;

  let stopPolling = () => {
    $poll.map(clearInterval);
    $prompt = false;
  };
  $: stopPolling($page);

  onDestroy(() => {
    clearInterval(refreshInterval);
    clearInterval(authCheckInterval);
    unsubscribeFromSession && unsubscribeFromSession();
  });
  onMount(() => {
    if (browser && !$password)
      $password = window.sessionStorage.getItem("password");
  });
</script>

<svelte:window bind:scrollY={y} />

{#if !($page.url.pathname.includes("/a/") && $page.url.pathname.split("/").length === 3)}
  <Head metadata={branding.meta} />
{/if}

<PageLoadIndicator />
<Snack />

<Sidebar bind:open />
<div class={y > 50 ? "sticky" : ""}>
  <Navbar bind:sidebar={open} />
</div>
<Dialog />

<div id="edgtf-theme-cursor" class="">
  <svg
    x="0px"
    y="0px"
    width="48px"
    height="48px"
    viewBox="0 0 48 48"
    xml:space="preserve"
  >
    <circle id="edgtf-cursor-dot" cx="28" cy="28" r="14" />
    <path id="edgtf-cursor-flame" fill="#FFFFFF" />
    <path id="edgtf-cursor-cart" fill="#FFFFFF" />
    <path id="edgtf-cursor-close" fill="#FFFFFF" />
    <path id="edgtf-cursor-move" fill="#FFFFFF" />
    <path id="edgtf-cursor-eye" fill="#FFFFFF" />
  </svg>
</div>

<main>
  <div class="mx-auto min-h-screen">
    <slot />
  </div>
</main>

<Footer />

<style global src="../main.css">
</style>
