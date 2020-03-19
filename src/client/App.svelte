<script>
    import {Router, Route} from "svelte-routing";
    import {Container} from "sveltestrap";
    import "recto/dist/css/bootstrap.min.css";
    import HomePage from "./pages/HomePage.svelte";
    import AboutPage from "./pages/AboutPage.svelte";
    import NavBar from "./components/nav/NavBar.svelte";

    export let url = "";
</script>

<Router url="{url}" basepath="%SVELTE_CLIENT_BASE_URL%">
    <NavBar/>
    <Container class="bg-light h-100" fluid>
        <Route path="/">
            <HomePage/>
        </Route>
        <Route path="/about">
            <AboutPage/>
        </Route>
    </Container>
</Router>

<style>
    :global(body, html) {
        height: 100%;
    }
</style>