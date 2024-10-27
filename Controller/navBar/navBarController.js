const navLinks = document.querySelectorAll('.nav-link');
const path = window.location.pathname;

navLinks.forEach(nav => {
    if (nav.href.includes(path)) {
        nav.classList.add('active');
    }
    nav.addEventListener('click', () => {
        navLinks.forEach(link => link.classList.remove('active'));
        nav.classList.add('active');
    });
});
const navBar = document.querySelector(".navbar")
const navBarToggle = document.querySelector(".navbar-toggler")
var isOpen = false;
navBarToggle.addEventListener('click',()=>{
    isOpen = !isOpen;
    isOpen ? navBar.classList.add("custom-navbar-open") : navBar.classList.remove("custom-navbar-open");
})