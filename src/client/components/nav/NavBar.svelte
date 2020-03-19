<script>
    import {Navbar, NavbarBrand, NavbarToggler, NavItem, Nav} from "sveltestrap";
    import NavLink from "./NavLink.svelte";

    let isOpen = false;

    function handleUpdate(event) {
        isOpen = event.detail.isOpen;
    }
</script>

<Navbar color="dark" dark expand="md">
    <NavbarBrand href="/">My Svelte App</NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)}/>
    <Nav class="ml-auto" navbar>
        <NavItem>
            <NavLink to="/about">About</NavLink>
        </NavItem>
    </Nav>
</Navbar>