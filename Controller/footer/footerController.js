

class footer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        // Fetching external HTML
        const html = await fetch('../../View/Footer/footerView.html').then(response => response.text());
        // Fetching external CSS
        const css = await fetch('../../View/Footer/footerView.css').then(response => response.text());

        // Injecting HTML and CSS into the Shadow DOM
        this.shadowRoot.innerHTML = `
            <style>
                ${css}
            </style>
            ${html}
        `;

    }
}
customElements.define('component-footer', footer);
