class Templator {
    constructor() {
        this.components = [];
    }

    createComponent(type, attributes, parent) {
        const elem = document.createElement(type);
        for (let key in attributes) {
            elem[key] = attributes[key];
        }
        parent.appendChild(elem);
        return elem;
    }

    generateFromJSON(json, parent) {
        json.forEach(component => {
            const elem = this.createComponent(component.type, component.attributes, parent);
            if (component.children) {
                this.generateFromJSON(component.children, elem);
            }
        });
    }
}

// Example JSON for dynamic content
const jsonConfig = [
    {
        type: 'div',
        attributes: { className: 'color-item', textContent: 'Primary Color' },
        children: [
            { type: 'input', attributes: { type: 'color', value: '#128' } }
        ]
    },
    {
        type: 'div',
        attributes: { className: 'font-item', textContent: 'Font Selector' },
        children: [
            { type: 'select', attributes: { innerHTML: '<option>Arial</option><option>Helvetica</option>' } }
        ]
    }
];