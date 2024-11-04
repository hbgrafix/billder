document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('themeSwitch');
    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', themeSwitch.checked);
    });

    const btnNew = document.getElementById('btnNew');
    const panelNew = document.getElementById('panelNew');
    btnNew.addEventListener('click', () => {
        togglePanel(panelNew, btnNew);
    });

    const btnSchemes = document.getElementById('btnSchemes');
    const panelSchemes = document.getElementById('panelSchemes');
    btnSchemes.addEventListener('click', () => {
        togglePanel(panelSchemes, btnSchemes);
    });

    const cancelComponentBtn = document.getElementById('cancelComponentBtn');
    cancelComponentBtn.addEventListener('click', () => {
        clearComponentForm();
        togglePanel(panelNew, btnNew);
    });







    //    const colorPaletteSection = document.getElementById('colorPalette');
    //    const fontSelectorSection = document.getElementById('fontSelector');
    const dynamicContentSection = document.getElementById('dynamicContent');
    const componentTypeSelect = document.getElementById('componentType');
    const componentTextInput = document.getElementById('componentText');
    const componentTxtColorInput = document.getElementById('componentTxtColor');
    const componentBgColorInput = document.getElementById('componentBgColor');

    const componentWidthRange = document.getElementById('componentWidth');
    const componentWidthValue = document.getElementById('componentWidthValue');
    const componentWidthUnit = document.getElementById('componentWidthUnit');

    const componentHeightRange = document.getElementById('componentHeight');
    const componentHeightValue = document.getElementById('componentHeightValue');
    const componentHeightUnit = document.getElementById('componentHeightUnit');

    const componentPaddingRange = document.getElementById('componentPadding');
    const componentPaddingValue = document.getElementById('componentPaddingValue');
    const componentPaddingUnit = document.getElementById('componentPaddingUnit');

    const componentMarginRange = document.getElementById('componentMargin');
    const componentMarginValue = document.getElementById('componentMarginValue');
    const componentMarginUnit = document.getElementById('componentMarginUnit');

    const componentIDInput = document.getElementById('componentID');
    const componentClassesInput = document.getElementById('componentClasses');

    const createComponentBtn = document.getElementById('createComponentBtn');




    const schemesList = document.querySelector('.schemes');
    const selectedScheme = document.querySelector('.active-scheme');
    const colorPicker = document.getElementById('colorPicker');
    const addSchemeButton = document.getElementById('addScheme');
    let schemesData = [
        { name: 'Default', primary: '#007bff', secondary: '#6c757d', accent: '#17a2b8', light: '#f8f9fa', dark: '#343a40' },
        { name: 'Scheme1', primary: '#1E2022', secondary: '#4F4F4F', accent: '#1E88E5', light: '#F9F9F9', dark: '#000000' },
        { name: 'Scheme2', primary: '#9370DB', secondary: '#BA55D3', accent: '#FFA07A', light: '#F5DEB3', dark: '#800080' },
        { name: 'Scheme3', primary: '#32CD32', secondary: '#00CED1', accent: '#FF6347', light: '#FFFFFF', dark: '#000000' },
        { name: 'Scheme4', primary: '#707070', secondary: '#999999', accent: '#FFC107', light: '#F2F2F2', dark: '#333333' }
    ];

    let activeScheme = { ...schemesData[0] };








    const templator = new Templator();
   // templator.generateFromJSON(jsonConfig, dynamicContentSection);
/*
    // Example Usage for Color Palette and Font Selector
    const colorPaletteConfig = [
        {
            type: 'div',
            attributes: { className: 'palette-item', textContent: 'Primary Color' },
            children: [
                { type: 'input', attributes: { type: 'color', value: '#ff0000' } }
            ]
        },
        {
            type: 'div',
            attributes: { className: 'palette-item', textContent: 'Secondary Color' },
            children: [
                { type: 'input', attributes: { type: 'color', value: '#00ff00' } }
            ]
        }
    ];

    const fontSelectorConfig = [
        {
            type: 'div',
            attributes: { className: 'font-item', textContent: 'Font Selector' },
            children: [
                { type: 'select', attributes: { innerHTML: '<option>Arial</option><option>Helvetica</option>' } }
            ]
        }
    ];

    templator.generateFromJSON(colorPaletteConfig, colorPaletteSection);
    templator.generateFromJSON(fontSelectorConfig, fontSelectorSection);

    templator.createComponent('div', { className: 'font-item', textContent: 'Fonto' }, dynamicContentSection);

*/

















    schemesList.addEventListener('click', (event) => {
        const target = event.target.closest('.scheme');
        if (target) {
            const schemeName = target.dataset.type;
            const scheme = schemesData.find(s => s.name === schemeName);
            if (scheme) {
                activeScheme = { ...scheme };
                updateSelectedSchemeName(schemeName);
                updateUIColors(activeScheme);
                document.querySelectorAll('.schemes .scheme').forEach(elem => elem.classList.remove('active'));
                target.classList.add('active');
            }
        }
    });

    function populateSchemes() {
        schemesList.innerHTML = '';
        schemesData.forEach((scheme) => {
            const schemeListItem = document.createElement('li');
            schemeListItem.classList.add('scheme');
            schemeListItem.dataset.type = scheme.name;

            // Scheme name
            const schemeNameSpan = document.createElement('span');
            schemeNameSpan.textContent = scheme.name;
            schemeListItem.appendChild(schemeNameSpan);

            // Pallet box
            const palletBox = document.createElement('div');
            palletBox.classList.add('palletBox');
            schemeListItem.appendChild(palletBox);

            // Color box
            const clrs = [scheme.primary, scheme.secondary, scheme.accent, scheme.light, scheme.dark];
            clrs.forEach(clr => {
                const clrBox = document.createElement('div');
                clrBox.classList.add('clrBox');
                clrBox.dataset.type = clr;
                clrBox.style.backgroundColor = clr;

                palletBox.appendChild(clrBox);
            });

            // Create and append delete button
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-scheme');
            deleteButton.dataset.type = scheme.name;
            schemeListItem.appendChild(deleteButton);

            schemesList.appendChild(schemeListItem);
        });
    }

    function updateSelectedSchemeName(name) {
        selectedScheme.textContent = `${name}`;
    }

    function updateUIColors(scheme) {
        document.documentElement.style.setProperty('--primary', scheme.primary);
        document.documentElement.style.setProperty('--secondary', scheme.secondary);
        document.documentElement.style.setProperty('--accent', scheme.accent);
        document.documentElement.style.setProperty('--light', scheme.light);
        document.documentElement.style.setProperty('--dark', scheme.dark);

        document.querySelectorAll('.clr').forEach(clrElem => {
            const colorName = clrElem.id;
            clrElem.querySelector('.display').style.backgroundColor = scheme[colorName];
            clrElem.querySelector('.hex').textContent = scheme[colorName];
        });
    }

    schemesList.addEventListener('click', (event) => {
        const schemeElement = event.target.closest('.scheme');
        if (schemeElement && !event.target.classList.contains('delete-scheme')) {
            const schemeName = schemeElement.dataset.type;
            activeScheme = { ...schemesData.find(scheme => scheme.name === schemeName) };
            updateSelectedSchemeName(activeScheme.name);
            document.querySelector('.schemes .active')?.classList.remove('active');
            schemeElement.classList.add('active');
            updateUIColors(activeScheme);
        }
    });

    document.querySelectorAll('.display').forEach(displayElem => {
        displayElem.addEventListener('click', () => {
            const colorName = displayElem.parentElement.id;
            colorPicker.value = rgbToHex(displayElem.style.backgroundColor);
            colorPicker.click();

            const newColorHandler = () => {
                const newColor = colorPicker.value;
                displayElem.style.backgroundColor = newColor;
                displayElem.nextElementSibling.textContent = newColor;
                activeScheme[colorName] = newColor;
                updateUIColors(activeScheme);
            };

            colorPicker.removeEventListener('input', colorPicker._listener);
            colorPicker._listener = newColorHandler;
            colorPicker.addEventListener('input', newColorHandler);
        });
    });

    function isUniqueScheme(newScheme) {
        return !schemesData.some(scheme => {
            return scheme.primary === newScheme.primary &&
                scheme.secondary === newScheme.secondary &&
                scheme.accent === newScheme.accent &&
                scheme.light === newScheme.light &&
                scheme.dark === newScheme.dark;
        });
    }

    addSchemeButton.addEventListener('click', () => {
        const schemeName = prompt('Enter a name for your scheme:');
        if (schemeName) {
            if (schemesData.some(scheme => scheme.name === schemeName)) {
                alert('Scheme name must be unique.');
                return;
            }

            const newScheme = {
                name: schemeName,
                primary: activeScheme.primary,
                secondary: activeScheme.secondary,
                accent: activeScheme.accent,
                light: activeScheme.light,
                dark: activeScheme.dark
            };

            if (!isUniqueScheme(newScheme)) {
                alert('Scheme colors must be unique. At least one color should be different.');
                return;
            }

            schemesData.push(newScheme);
            activeScheme = { ...newScheme };
            populateSchemes();
            updateSelectedSchemeName(schemeName);
            updateUIColors(activeScheme);
            const newSchemeElement = Array.from(schemesList.children).find(child => child.dataset.type === schemeName);
            if (newSchemeElement) {
                newSchemeElement.classList.add('active');
            }
        }
    });

    // Delete scheme functionality
    schemesList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-scheme')) {
            const schemeName = event.target.dataset.type;
            schemesData = schemesData.filter(scheme => scheme.name !== schemeName);
            populateSchemes();
            if (activeScheme.name === schemeName) {
                activeScheme = { ...schemesData[0] };
                updateSelectedSchemeName(activeScheme.name);
                updateUIColors(activeScheme);
                const firstSchemeElement = document.querySelector('.schemes .scheme');
                if (firstSchemeElement) {
                    firstSchemeElement.classList.add('active');
                }
            }
        }
    });


    function rgbToHex(rgb) {
        const result = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return result && result.length === 4 ?
            "#" +
            ("0" + parseInt(result[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(result[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(result[3], 10).toString(16)).slice(-2) : '';
    }

    populateSchemes();
    updateUIColors(activeScheme);



















    const fileInput = document.getElementById('fileInput');
    const btnOpen = document.getElementById('btnOpen');
    const btnSave = document.getElementById('btnSave');

    btnOpen.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                if (file.type === 'text/html') {
                    importHTML(content);
                } else if (file.type === 'text/css') {
                    importCSS(content);
                } else if (file.type === 'application/json') {
                    importJSON(content);
                }
            };
            reader.readAsText(file);
        }
    });

    btnSave.addEventListener('click', () => {
        exportFiles();
    });
















    // Update range value displays
    componentWidthRange.addEventListener('input', () => {
        componentWidthValue.value = componentWidthRange.value;
    });

    componentHeightRange.addEventListener('input', () => {
        componentHeightValue.value = componentHeightRange.value;
    });

    componentPaddingRange.addEventListener('input', () => {
        componentPaddingValue.value = componentPaddingRange.value;
    });

    componentMarginRange.addEventListener('input', () => {
        componentMarginValue.value = componentMarginRange.value;
    });


    createComponentBtn.addEventListener('click', () => {
        const componentType = componentTypeSelect.value;
        const componentText = componentTextInput.value;
        const componentTxtColor = componentTxtColorInput.value;
        const componentBgColor = componentBgColorInput.value;
        const componentWidth = `${componentWidthRange.value}${componentWidthUnit.value}`;
        const componentHeight = `${componentHeightRange.value}${componentHeightUnit.value}`;
        const componentPadding = `${componentPaddingRange.value}${componentPaddingUnit.value}`;
        const componentMargin = `${componentMarginRange.value}${componentMarginUnit.value}`;
        const componentID = componentIDInput.value;
        const componentClasses = componentClassesInput.value;

        const newComponent = document.createElement(componentType);
        if (componentText) newComponent.textContent = componentText;
        if (componentTxtColor) newComponent.style.color = componentTxtColor;
        if (componentBgColor) newComponent.style.backgroundColor = componentBgColor;
        if (componentWidth) newComponent.style.width = componentWidth;
        if (componentHeight) newComponent.style.height = componentHeight;
        if (componentPadding) newComponent.style.padding = componentPadding;
        if (componentMargin) newComponent.style.margin = componentMargin;
        if (componentID) newComponent.id = componentID;
        if (componentClasses) newComponent.className = componentClasses;

        dynamicContentSection.appendChild(newComponent);
        clearComponentForm();
    });
















    function togglePanel(panel, button) {
        const isHidden = panel.classList.contains('hidden');
        document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
        document.querySelectorAll('.btn-toolbar').forEach(b => b.classList.remove('active'));
        if (isHidden) {
            panel.classList.remove('hidden');
            button.classList.add('active');
            createPanelCode(panel);
        } else {
            removePanelCode(panel);
        }
    }

    const code = "<p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p><p>This is where <code>Code</code> is inserted!</p>";
    /*<pre><code>function Panel(element, canClose, closeHandler) \{
          this.element = element;
          this.canClose = canClose;
          this.closeHandler = function () { if (closeHandler) closeHandler() };
        }</code></pre>;*/

    function createPanelCode (panel) {
        const panelCode = document.createElement('div');
        const panelId = panel.id;

        function computeStyle(variable, parameter) {
            const style = window.getComputedStyle(variable).getPropertyValue(parameter);
            return style;
        };


        const right = computeStyle(panel, 'right');
        let offset = 330;
        let rightAdjust =   (parseInt(right.replace(/px/,"")) - offset )+"px";


        panelCode.classList.add("panel", "panelCode");
        panelCode.id = 'code' + panelId;

        panelCode.style.setProperty("right", rightAdjust);
        //console.log(rightAdjust);
        const panelCodeContent =
            '<div class="col start"><h3>'
            + panelId.slice(5,panelId.length)
            + '</h3><pre id="code" class="code"'
            + code
            +'</pre><button class="btn" id="btnCodeCopy">Copy</button></div>';
        panelCode.innerHTML = panelCodeContent;
        panel.parentNode.appendChild(panelCode);
        //console.log(panelCode);
        //console.log('added');


        const btnCodeCopy = document.querySelector('#btnCodeCopy');

            // Attach the event listener after the element is in the DOM

    if (btnCodeCopy) {
        btnCodeCopy.addEventListener('click', () => {
            const codeCopy = document.querySelector('#code').innerText;
            copyCode(codeCopy);
            //console.log(codeCopy);
        });
    }


    }





    function copyCode(a) {
        navigator.clipboard.writeText(a).then(() => {
            alert("Copied the text: " + a);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }



    function removePanelCode (panel) {
        const panelId = panel.id;
        //console.log(panelId);
        const panelCodeId = 'code' + panelId;
        //console.log(panelCodeId);
        const removePanelCode = document.getElementById(panelCodeId);
        //console.log(removePanelCode);
        removePanelCode.parentNode.removeChild(removePanelCode);
        const btnCodeCopy = false;
    }




    function clearComponentForm() {
        componentTextInput.value = '';
        componentTxtColorInput.value = 'var(--txt)';
        componentBgColorInput.value = 'var(--bg)';
        componentWidthRange.value = 100;
        componentWidthUnit.value = 'auto';
        componentHeightRange.value = 30;
        componentHeightUnit.value = 'px';
        componentPaddingRange.value = 5;
        componentPaddingUnit.value = 'px';
        componentMarginRange.value = 5;
        componentMarginUnit.value = 'px';
        componentWidthValue.value = '100';
        componentHeightValue.value = '30';
        componentPaddingValue.value = '5';
        componentMarginValue.value = '5';
        componentIDInput.value = '';
        componentClassesInput.value = '';
    }


























    
    function exportFiles() {
        const htmlContent = dynamicContentSection.innerHTML;
        const cssContent = extractCSS();
        const jsonContent = extractJSON();

        downloadFile('dynamicContent.html', htmlContent, 'text/html');
        downloadFile('styles.css', cssContent, 'text/css');
        downloadFile('components.json', jsonContent, 'application/json');
    }

    function extractCSS() {
        const styles = Array.from(dynamicContentSection.querySelectorAll('*')).map(element => {
            const style = window.getComputedStyle(element);
            return `
                #${element.id} {
                    color: ${style.color};
                    background-color: ${style.backgroundColor};
                    width: ${style.width};
                    height: ${style.height};
                    padding: ${style.padding};
                    margin: ${style.margin};
                }
            `;
        }).join('\n');
        return styles;
    }

    function extractJSON() {
        const components = Array.from(dynamicContentSection.children).map(element => ({
            type: element.tagName.toLowerCase(),
            text: element.textContent,
            txtColor: element.style.color,
            bgColor: element.style.backgroundColor,
            width: element.style.width,
            height: element.style.height,
            padding: element.style.padding,
            margin: element.style.margin,
            id: element.id,
            classes: element.className
        }));
        return JSON.stringify(components, null, 2);
    }

    function importHTML(content) {
        dynamicContentSection.innerHTML = content;
    }

    function importCSS(content) {
        const style = document.createElement('style');
        style.textContent = content;
        document.head.appendChild(style);
    }

    function importJSON(content) {
        const components = JSON.parse(content);
        components.forEach(component => {
            const element = document.createElement(component.type);
            element.textContent = component.text;
            element.style.color = component.txtColor;
            element.style.backgroundColor = component.bgColor;
            element.style.width = component.width;
            element.style.height = component.height;
            element.style.padding = component.padding;
            element.style.margin = component.margin;
            element.id = component.id;
            element.className = component.classes;
            dynamicContentSection.appendChild(element);
        });
    }

    function downloadFile(filename, content, mimeType) {
        const link = document.createElement('a');
        link.href = `data:${mimeType};charset=utf-8,${encodeURIComponent(content)}`;
        link.download = filename;
        link.click();
    }




});




