<script>
  import { Avatar, Search } from "$comp";
  import { show, user, token } from "$lib/store";
  // import DarkModeToggle from "../components/DarkModeToggle.svelte";

  export let open = false;
  let toggle = () => (open = !open);
</script>

<style>
  .menu button {
    font-size: 15px;
    width: auto;
    text-align: left;
    font-family: "Montserrat";
    font-weight: bold;
    color: #000;
    /* text-transform: uppercase; */
  }

  .menu a {
    padding: 0 20px;
  }

  .menu a {
  color: #fff;
  /* text-transform: uppercase; */
  text-decoration: none;
  letter-spacing: 0.15em;
  display: inline-block;
  padding: 5px 20px;
  position: relative;
}
  .menu a:after {    
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: #000000;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  .menu a:hover:after { 
    width: 100%; 
    left: 0; 
  }

  .menu :global(.search) {
    border: 1px solid lightgray;
    border-radius: 30px;
    margin-right: 15px;
    width: 250px;
  }

  .menu :global(.search):focus-within {
    border: 1px solid #5c5d60;
    border-radius: 30px;
  }

  .menu :global(input) {
    width: auto;
    width: 80%;
    border: none;
    background: none;
    padding: 0.5rem 1.2rem;
  }

  .menu :global(.fa-search) {
    font-size: 1.2rem;
  }

  @media only screen and (max-width: 1023px) {
    .menu :global(.search) {
      display: none;
    }
  }

  @media screen and (max-width: 1200px) {
    .menu a {
      padding: 5px 10px;
      font-size: 16px;
    }
  }

  @media only screen and (max-width: 1023px) {
    .menu {
      flex-direction: column;
      align-items: flex-start;
      margin-top: 25%;
      width: 100%;
    }

    .menu a {
      margin: 20px 0 0 20px;
    }
  }

</style>

<div class="flex justify-between items-center menu relative">
  <a href="https://www.nftglee.com/"><button on:click={toggle}>Home</button></a>
  <a href="https://www.nftglee.com/built-better/"><button on:click={toggle}>Built Better</button></a>
  <a href="https://www.nftglee.com/services/"><button on:click={toggle}>Services</button></a>
  <a href="/market"><button on:click={toggle}>Marketplace</button></a>
  {#if $user}
    <a href="https://www.nftglee.com/contact-us-4/"><button on:click={toggle}>Contact Us</button></a>
    {#if $user.is_admin}
      <a href="/admin"><button on:click={toggle}>Admin</button></a>
    {/if}
    <a href={`/u/${$user.username}`}>
      <button on:click={toggle} class="flex" style="border: none">
        <Avatar user={$user} />
      </button></a>
  {:else}
  <a href="https://www.nftglee.com/about-us/"><button on:click={toggle}>About Us</button></a>
    <a href="/login"><button on:click={toggle}>Login</button></a>
    <a href="/register"><button on:click={toggle}>Sign Up</button></a>
    <a href="https://www.nftglee.com/support/"><button on:click={toggle}>Support</button></a>
  {/if}
  <!-- <DarkModeToggle/> -->
</div>
