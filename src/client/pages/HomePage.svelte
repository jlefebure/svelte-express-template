<script>
    import {Alert} from "sveltestrap"
    import HelloJumbotron from "../components/HelloJumbotron.svelte";
    import {helloWorld} from '../stores/helloworld-store'
</script>

<div>
    {#if $helloWorld}
        <Alert class="my-2" color="primary">{$helloWorld}</Alert>
    {/if}

    <HelloJumbotron/>
</div>