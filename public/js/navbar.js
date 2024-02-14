function toggleNavbarMenu() {
    const navbarElements = document.getElementById('navbar-elements')

    if (navbarElements.style.transform == "translateX(100%)") {
        navbarElements.style.transform = "translateX(0%)"
    }
    else {
        navbarElements.style.transform = "translateX(100%)"
    }
}