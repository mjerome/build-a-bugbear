<script>
    
    import Nav from './Nav.svelte';
    import {navigate} from 'svelte-routing';

    function is404() {
        navigate("/404", { replace: true });
    }
    
</script>
<main>
    <div id="nav" class="home">
        <Nav />
        <button on:click={is404}>go to 404</button>
    </div>
</main>