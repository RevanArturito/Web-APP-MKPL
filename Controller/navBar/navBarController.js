class navBarView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        // Fetching external HTML
        const html = await fetch('../../View/Navbar/navBarView.html').then(response => response.text());
        // Fetching external CSS
        const css = await fetch('../../View/Navbar/navBarView.css').then(response => response.text());

        // Injecting HTML and CSS into the Shadow DOM
        this.shadowRoot.innerHTML = `
            <style>
                ${css}
            </style>
            ${html}
        `;

        // Adding event listener for navbar toggle after HTML is loaded
        let isOpen = false;
        const navbarToggler = this.shadowRoot.querySelector('.navbar-toggler');
        const navbar = this.shadowRoot.querySelector('.navbar');
        const navbarCollapse = this.shadowRoot.querySelector('#basic-navbar-nav'); // Target the collapse element

        if (navbarToggler && navbarCollapse) {
            navbarToggler.addEventListener('click', () => {
                isOpen = !isOpen;
                console.log(isOpen)
                if (isOpen) {
                    navbar.classList.add('custom-navbar-open');
                    navbarCollapse.classList.add('show');// Add Bootstrap's show class manually
                } else {
                    navbar.classList.remove('custom-navbar-open');
                    navbarCollapse.classList.remove('show')
                }
            });
        }


        const navLinks = this.shadowRoot.querySelectorAll('.nav-link');
        const path = window.location.pathname;
        
        // Menetapkan kelas 'active' pada link saat halaman dimuat
        navLinks.forEach(nav => {
            if (nav.href.includes(path)) {
                nav.classList.add('active');
            }
        
            // Menambahkan event listener untuk setiap nav link
            nav.addEventListener('click', () => {
                navLinks.forEach(link => link.classList.remove('active'));
                nav.classList.add('active');
            });
        });
        
    }
}
customElements.define('nav-bar', navBarView);
