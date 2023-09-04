/**
 * Easy Dream Studio
 * Version 0.3
 * Author: @3V1LXD
 * License: MIT
 * Description:  
 * Easy Dream Studio (EDS) is a transformative plugin 
 * for the Easy Diffusion (ED) application that aims 
 * to replicate the UI of Stability.ai's Dream Studio. 
 * As a front-end for the image-generating software 
 * Stable Diffusion, Dream Studio's UI has inspired 
 * the design of EDS.
 */

function waitFor(selectors) {
    return new Promise((resolve) => {
        const observer = new MutationObserver(() => {
            if (selectors.every(selector => document.querySelector(selector) !== null)) {
                observer.disconnect();
                resolve();
            }
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
    });
}

(async function () {
    await waitFor(['body', '#tab-merge', '#tab-news']);
    console.log("EasyDreamStudio.plugin.js loading...");
    "use strict";
    let styleSheet = document.createElement("style");
    styleSheet.textContent = `
        html, body {
            height: 100% !important;
        }

        html {
            overflow: hidden;
        }

        body {
            overflow: hidden;
            height: 100dvh;
        }

        *, html {
            scrollbar-width: thin; /* For Firefox */
            transition: all 0.5s ease;
        }

        /* For WebKit-based browsers */
        ::-webkit-scrollbar {
            height: 8px;
            width: 8px;
        }

        ::-webkit-scrollbar-thumb {
            border-radius: 4px;
        }

        ::-webkit-scrollbar-track {
            box-shadow: none;
        }

        ::-webkit-scrollbar-corner {
            background-color: transparent;
        }

        textarea::-webkit-resizer {
            background-color: var(--background-color4);
        }

        .icon {
            font-style: normal;
            font-weight: normal;
        }

        #top-nav {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        }

        #logo {
            display: block;
            width: auto;
            height: min-content;
            padding: 0 10px;
        }

        #logo {
            display: grid;
            align-items: baseline;
            justify-items: center;
            width: min-content;
            height: min-content;
            margin: 10px 0;
        }

        #logo h1 {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
        }

        #logo h1 img {
            width: 32px;
            height: 32px;
            margin-right: 8px;
        }

        #logo-wrapper, #version-wrapper, #by-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #version-wrapper, #by-wrapper {
            cursor: pointer;
        }
        
        #donate-wrapper {
            display: grid;
            grid-template-rows: 1fr 1fr;
            align-items: center;
            justify-content: center;
            margin: 10px;
        }

        #donate-wrapper > *:nth-child(1) {
            grid-row: 1;
            grid-column: 1 / span 3;
        }

        #donate-wrapper > *:nth-child(2) {
            grid-row: 2;
            grid-column: 1;
        }

        #donate-wrapper > *:nth-child(3) {
            grid-row: 2;
            grid-column: 2;
        }

        #donate-wrapper > *:nth-child(4) {
            grid-row: 2;
            grid-column: 3;
        }

        #donate-wrapper button {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px 10px;
            margin: 10px;
            font-size: 12px;
            white-space: nowrap;
        }

        #donate-wrapper button img {
            margin-right: 8px;
        }

        #donate-dream img {
            width: 12px;
            height: 12px;
            margin-right: 8px;
        }

        .easy-color {
            color: #D4AF37;
        }

        .dream-gradient {
            content: attr(data-content);
            background-image: linear-gradient(to left, blue, indigo, purple);
            -webkit-background-clip: text;
            color: transparent;
        }

        #tab-container {
            display: flex;
            flex-direction: row;
            margin: 16px 0;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        .tab {
            border-radius: 4px;
            white-space: nowrap;
        }

        #server-status {
            top: 0px;
        }

        #top-nav a {
            margin: 16px 16px;
        }

        #coffeeButton {
            transform: none;
        }

        #editor {
            flex: none !important;
            opacity: 1;
            visibility: visible;
            width: 520px;
        }

        #prompt {
            grid-column: 1 / span 4;
            grid-row: 2;
            width: 100% !important;
        }

        label[for="prompt"] {
            grid-column: 1;
            grid-row: 1;
        }

        #prompt-toolbar {
            grid-column: 2 / span 2;
            grid-row: 1;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        #makeImage, #editor-settings {
            margin: 10px 0;
        }

        .editor {
            padding: 10px;
            box-sizing: border-box;
            overflow-y: scroll;
            height: 100% !important;
        }

        .splitter {
            position: relative;
            width: 1px;
            margin-right: 15px;
            cursor: col-resize;
            background-color: var(--background-color3);
            z-index: 997;
        }

        .splitter:hover {
            background-color: var(--accent-color);
        }

        .split-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 48px;
            height: 100%;
            z-index: 998;
        }

        .toggle-btn {
            display: none;
            position: absolute;
            left: 3px;
            margin: 20px;
            background-color: var(--background-color3);
            border: none;
            outline: none;
            font-size: 12px;
            cursor: pointer;
            padding: 6px 8px;
            z-index: 999
        }

        .toggle-btn:hover {
            background-color: var(--accent-color);
        }

        .splitter:hover .toggle-btn {
            display: block;
            background-color: var(--accent-color);
        }

        .splitter:hover {
            box-shadow: 0 0 10px 5px var(--accent-color);
        }

        #editor-settings-entries > div > b, #editor-settings-entries > div > button {
            display: none;
        }

        #initial-text {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding: 10px;
        }

        #preview, #tab-content-settings, #tab-content-about, #tab-content-merge, #tab-content-news {
            overflow-y: scroll;
        }

        #preview-content {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            text-align: center;
        }

        #clear-all-previews {
            margin-right: 8px;
            grid-column: 1;
        }

        #show-download-popup {
            margin-right: 8px;
            grid-column: 2;
        }

        .display-settings {
            margin-left: 8px;
            grid-column: 3;
            justify-self: flex-end;
        }

        .display-settings {
            margin-left: 8px;
        }

        #tab-content-main {
            padding: 0;
        }

        #editor-elements-btn {
            padding: 5px 0px 5px 0px;
            width: 100%;
            display: flex;
            justify-content:center;
            align-items: center;
            margin: 5px 0 5px 0 ;
        }

        .editor {
            height: 100% !important;
        }

        .preview-prompt, .taskConfig, .outputMsg {
            display: block;
            width: 100%;
            box-sizing: border-box;
            margin-top: 16px;
        }

        #promptsFromFileBtn {
            grid-row: 1;
            margin-left: 4px;
            width: fit-content;
        }

        #editor-modifiers {
            margin: 0;
        }

        #editor-modifiers.active {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        #editor-settings-entries table td {
            position: relative !important;
        }

        #editor-negative-prompt .collapsible-content {
            padding: 0;
        }

        #negative_prompt {
            width: 100%;
            margin: 10px 0 10px 0;
            border: 2px solid var(--background-color2);
        }

        #init_image_preview_container {
            display: grid !important;
            grid-template-columns: fit-content(100%) fit-content(100%);
            justify-items: center;
        }

        #init_image_buttons {
            box-sizing: border-box;
            padding: 10px;
            max-width: min-content;
        }

        #init_image_buttons > button {
            vertical-align: middle;
        }

        .image-editor-popup, image-inpainter {
            overflow: scroll !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100dvw !important;
            height: 100% !important;
            max-width: none !important;
            max-height: none !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        .image-editor-popup > div > h1, image-inpainter > div > h1 {
            display: none;
        }

        .image-editor-popup > div , .image-editor-popup > div > div, image-inpainter > div, image-inpainter > div > div {
            min-width: 0 !important;
            min-height: 0 !important;
            height: min-content !important;
            max-width: none !important;
            max-height: none !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        .image-editor-popup > div {
        }

        .image-editor-popup > div > div, image-inpainter > div > div {
            padding: 10px !important;
        }

        .image-editor-button {
            display: block;
            width: min-content;
            margin: 5px 0;
            padding: 5px 10px;
            border: none;
            border-radius: 8px;
            background-color: var(--background-color1);
            cursor: pointer;
            text-align: left;
            white-space: nowrap;
        }

        .editor-controls-left {
            padding: 0;
        }

        .editor-controls-left > div > h4 {
            display: flex;
            background-color: var(--background-color1);
            border-radius: 8px;
            padding: 6px 10px 6px 6px;
            align-items: center;
            text-align: center;
            cursor: pointer;
        }

        .image_editor_tool, image_editor_color, .image_editor_brush_size, .image_editor_opacity, .image_editor_sharpness {
            position: relative;
        }

        .editor-options-container {
            display: none;
            position: absolute;
        }

        .editor-options-container.active {
            display: flex;
            flex-direction: row;
            width: min-content;
            left: 144px;
            padding: 0px;
            border-radius: 8px;
            z-index: 100;
        }

        .image_editor_opacity .editor-options-container, .image_editor_sharpness .editor-options-container {
            top: 0;
        }

        .image_editor_tool .editor-options-container {
            top: 0;
            left: 140px;
        }

        .image_editor_color .editor-options-container {
            top: 32px;
            left: 148px;
        }

        .image_editor_brush_size .editor-options-container {
            top: calc(-100% / 2);
        }

        .image_editor_color > div {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin: 5px 0;
            min-width: 240px;
            top: 20px;
        }
        
        .editor-controls-center {
            display: block;
            flex: 0;
            justify-content: none;
            align-items: none;
            padding: 20px;
        }

        .editor-controls-right {
            display: flex;
            padding: 0;
            flex-direction: column;
            justify-content: space-between;
            align-items: left;
        }

        .editor-controls-right > div {
            width: 128px;
        }

        .editor-controls-right > div:last-child {
            padding-bottom: 20px;
        }

        #makeImage {
            max-width: none;
        }

        #modifiers-header-right {
            justify-content: right;
        }

        #embeddings-dialog-header-right {
            display: flex;
            justify-content: right;
            align-items: center;
        }

        #embeddings-dialog-close-button {
            margin-left: 8px;
        }

        #preview-tools {
            width: 100%;
        }

        #supportBanner {
            height: 0;
            border: none;
            margin: 0;
            color: none;
            opacity: 0;
        }

        .header-content {
            display: grid;
            grid-gap: 6px;
            grid-template-rows: repeat(4, min-content);
        }

        .drag-handle {
            grid-row: 1;
            grid-column: 1 / span 2;
            min-height: 0;
        }

        .taskStatusLabel {
            grid-row: 2;
            grid-column: 1 / span 4;
            margin: 0;
        }

        .useSettings {
            grid-row: 1;
            grid-column: 3;
            margin: 0;
            white-space: nowrap;
        }

        .stopTask {
            grid-row: 1;
            grid-column: 4;
            white-space: nowrap;
        }

        .preview-prompt {
            grid-row: 3;
            grid-column: 1 / span 4;
            margin: 0;
        }

        .taskConfig {
            grid-row: 4;
            grid-column: 1 / span 4;
            margin: 0;
        }

        .outputMsg {
            grid-row: 5;
            grid-column: 1 / span 4;
            margin: 0;
        }

        .progress-bar {
            grid-row: 6;
            grid-column: 1 / span 4;
        }

        .img-preview {
            text-align: center;
        }

        .imgItem {
            margin: 10px;
        }

        #footer-popup::backdrop {
            background: rgba(0, 0, 0, 0.7);
        }

        #footer-popup {
            background: rgba(0, 0, 0, 0.7);
            max-width: 40%;
        }

        #footer {
            color: var(--text-color);
        }

        .merge-container {
            margin-left: 0 !important;
            margin-right: 0 !important;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @media screen and (max-width: 960px) {
            #editor {
                position: absolute;
                bottom: 0;
                left: 0;
                padding: 0;
                width: 100dvw !important;
                height: min-content !important;
                z-index: 100;
                display: flex;
                flex-direction: column;
                align-items: left;
                justify-content: flex-end;
                overflow-x: hidden;
            }

            #editor-elements-btn {
                margin: 0 0 15px 0;
            }

            #editor-modifiers.active {
                width: 100%;
            }

            #editor-modifiers-entries {
                padding-left: 0;
                margin: 0;
                background-color: var(--background-color2);
                border-radius: 8px 8px 0 0;
                overflow-y: scroll;
                z-index: 100;
            }

            .modifier-category {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                padding: 0 10px;
                background-color: var(--background-color2);
            }

            .modifier-category h5 {
                text-align: left;
                width: 100%;
            }
        
            #editor-settings {
                margin: 10px 10px 0 10px;
            }

            #editor-settings-entries {
                height: 100%;
                background-color: var(--background-color2);
                border-radius: 8px 8px 0 0;
                overflow-y: scroll;
                z-index: 100;
            }

            .collapsible-content {
                padding: 0;
            }

            #editor-settings-entries > div {
                display: grid;
                grid-template-columns: 2fr 1fr;
                grid-gap: 10px;
                padding: 10px;
            }
            

            #editor-settings-entries > div > button {
                display: block;
                justify-self: end;
            }

            #editor-settings-entries > div > table {
                grid-row: 2;
                grid-column: 1 / span 2;
            }

            #editor-inputs-prompt{
                padding: 0 10px;
            }

            #editor-inputs-init-image {
                margin: 0 10px 0 10px;
            }

            .splitter {
                display: none;
            }

            #tab-content-wrapper {
                display: grid;
                grid-template-columns: 1fr;
                grid-gap: 10px;
            }

            .image-editor-popup, image-inpainter {
                flex-direction: row !important;
                height: 100% !important;
            }

            .image-editor-popup > div, image-inpainter > div {
                flex-direction: row !important;
                align-items: center !important;
                justify-content: center !important;
                width: 100% !important;
                height: 100% !important;
            }
            
            .image-editor-popup > div > .flex-container, image-inpainter > div > .flex-container {
                flex-direction: column !important;
                align-items: center !important;
                justify-content: center !important;
            }

            .editor-controls-left {
                display: flex;
                flex-wrap: wrap;
                justify-content: center !important;
                align-items: center !important;
                max-width: 100%;
                min-height: 128px;
                max-height: 128px;
                padding-top: 32px;
                gap: 10px;
            }

            .editor-controls-left > div {
                flex-basis: auto;
                height: min-content;
            }

            .editor-controls-left > div > h4 {
                margin: 0;
            }

            .image_editor_tool, image_editor_color, .image_editor_brush_size, .image_editor_opacity, .image_editor_sharpness {
                position: static;
            }

            .image_editor_tool .editor-options-container, .image_editor_color .editor-options-container, .image_editor_brush_size .editor-options-container, .image_editor_opacity .editor-options-container, .image_editor_sharpness .editor-options-container {
                top: 180px;
                left: 50%;
                transform: translateX(-50%);
            }

            .editor-controls-right {
                display: flex;
                flex-direction: column !important;
                justify-content: center !important;
                align-items: center !important;
                width: 100%;
                column-gap: 10px;
            }

            .editor-controls-right > div {
                display: flex;
                width: 100%;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                column-gap: 10px;
            }

            .editor-controls-right > div, .editor-controls-right > div:last-child {
                flex-basis: auto;
                height: min-content;
                flex: 0;
            }

            .editor-controls-right > div > h4 {
                display: none;
            }

            #footer-popup {
                max-width: 80%;
            }
        }

        @media screen and (max-width: 1090px) {
            #top-nav {
                flex-direction: column;
                align-items: center;
            }
        }
        `;
    document.head.appendChild(styleSheet);

    const editor = document.getElementById('editor');
    const editorInputs = document.getElementById('editor-inputs');

    const logo = document.getElementById('logo');
    const easyText = document.createElement('span');
    easyText.textContent = 'Easy';
    easyText.classList.add('easy-color');

    
    const separator = document.createElement('span');
    separator.textContent = '/';
    separator.style = 'color: purple; font-size: 80px; font-weight: normal;';
    const separator2 = separator.cloneNode(true);
    separator2.style = 'color: purple; font-size: 48px; font-weight: normal;';
    

    const dreamText = document.createElement('span');
    dreamText.setAttribute('id', 'dream-gradient');
    dreamText.textContent = 'Dream';
    dreamText.classList.add('dream-gradient');

    logo.innerHTML = logo.innerHTML.replace('Diffusion', dreamText.outerHTML);
    const logoWrapper = document.createElement('span');
    const logoImg = logo.querySelector('img');
    const easyVersion = logo.querySelector('small');
    easyVersion.classList.add('easy-color');

    const logoImgH1 = document.createElement('h1');
    logoImgH1.appendChild(logoImg);
    logoImgH1.appendChild(easyText);
    logoImgH1.appendChild(separator);
    logoImgH1.appendChild(dreamText);
    logoWrapper.appendChild(logoImgH1);
    logoWrapper.id = 'logo-wrapper';
    logo.innerHTML = '';
    logo.appendChild(logoWrapper);

    const dreamVersion = document.createElement('small');
    dreamVersion.textContent = 'v0.3';
    dreamVersion.style = 'margin-left: 40px;';
    dreamVersion.classList.add('dream-gradient');
    const vWrapper = document.createElement('span');
    vWrapper.appendChild(easyVersion);
    vWrapper.appendChild(dreamVersion);
    vWrapper.id = 'version-wrapper';
    vWrapper.style = 'position: relative; top: -30px; left: -23px;';

    logoWrapper.insertAdjacentElement('afterend', vWrapper);
    easyVersion.addEventListener('click', () => {
        open('https://github.com/cmdr2/stable-diffusion-ui', '_blank');
    });
    dreamVersion.addEventListener('click', () => {
        open('https://github.com/3V1LXD/ed-ui-plugin-dream-studio-ui', '_blank');
    });

    const tabMain = document.getElementById('tab-main');
    const tabMainI = tabMain.querySelector('i');
    tabMainI.className = 'icon';
    tabMainI.textContent = '🖼️';

    const tabSettings = document.getElementById('tab-settings');
    const tabSettingsI = tabSettings.querySelector('i');
    tabSettingsI.className = 'icon';
    tabSettingsI.textContent = '⚙️';

    const tabAbout = document.getElementById('tab-about');
    const tabAboutI = tabAbout.querySelector('i');
    tabAboutI.className = 'icon';
    tabAboutI.textContent = '📖';

    const tabMerge = document.getElementById('tab-merge');
    const tabMergeI = tabMerge.querySelector('i');
    tabMergeI.className = 'icon';
    tabMergeI.textContent = '🔀';

    const tabNews = document.getElementById('tab-news');
    const tabNewsI = tabNews.querySelector('i');
    tabNewsI.className = 'icon';
    tabNewsI.textContent = '📰';

    const topNav = document.getElementById('top-nav');

    const patreon = document.createElement('button');
    const patreonLogo = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" style="fill: #f1465a; margin-right: 8px;"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 3H3v18h3V3zm8.5 13a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z"></path></svg>';
    patreon.innerHTML = `${patreonLogo} Become a patron`;
    patreon.addEventListener('click', () => {
        open('https://www.patreon.com/EasyDiffusion', '_blank');
    });

    const coffeecmdr2 = document.createElement('button');
    coffeecmdr2.innerHTML = `<img src="https://storage.ko-fi.com/cdn/cup-border.png" width="19px" height="12px">Buy cmdr2 a coffee`;
    coffeecmdr2.addEventListener('click', () => {
        open('https://ko-fi.com/easydiffusion', '_blank');
    });

    const coffee3v1lxd = document.createElement('button');
    coffee3v1lxd.innerHTML = `<img src="https://storage.ko-fi.com/cdn/cup-border.png" width="19px" height="12px">Buy 3V1LXD a coffee`;
    coffee3v1lxd.addEventListener('click', () => {
        open('https://ko-fi.com/3v1lxd', '_blank');
    });

    const donateWrapper = document.createElement('span');
    donateWrapper.id = 'donate-wrapper';
    donateWrapper.appendChild(patreon);
    donateWrapper.appendChild(coffeecmdr2);
    donateWrapper.appendChild(separator2);
    donateWrapper.appendChild(coffee3v1lxd);
    topNav.appendChild(donateWrapper);

    // https://www.patreon.com/EasyDiffusion

    const preview = document.getElementById('preview');
    const previewTools = document.getElementById('preview-tools');
    const showDownloadPopupBtn = document.getElementById('show-download-popup');
    const dreamBtn = document.getElementById('makeImage');
    const dreamBtnI = document.createElement('i');
    dreamBtnI.className = 'icon';
    dreamBtnI.textContent = '✨';


    const lineSeparators = document.getElementsByClassName('line-separator');
    while (lineSeparators.length > 0) {
        lineSeparators[0].parentNode.removeChild(lineSeparators[0]);
    }

    editor.classList.add('editor');

    const splitter = document.createElement('div');
    splitter.className = 'splitter';
    editor.parentNode.insertBefore(splitter, preview);

    const splitOverlay = document.createElement('div');
    splitOverlay.className = 'split-overlay';
    splitter.appendChild(splitOverlay);

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'toggle-btn';
    toggleBtn.textContent = '◀️';
    splitter.appendChild(toggleBtn);

    splitter.addEventListener('mousedown', (e) => {
        if (e.target === toggleBtn) return;
        e.preventDefault();

        const onMouseMove = (e) => {
            updateToggle(e);
            updateLayout();
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        updateLayout();
    });

    const updateToggle = (e) => {
        const splitter = e.clientX;
        if (isEditorOpen && splitter < snapThreshold) {
            toggleEditor(0);
        } else if (!isEditorOpen && splitter > snapThreshold) {
            toggleEditor(splitter);
        } else if (isEditorOpen) {
            toggleEditor(splitter);
        }
    };

    const editorMods = document.getElementById('editor-modifiers');
    const editorModsTitle = editorMods.querySelector('h4');
    editorModsTitle.innerText = '🌈 Style';

    const editorStgs = document.getElementById('editor-settings');
    const editorStgsTitle = editorStgs.querySelector('h4');
    editorStgsTitle.innerText = '📐 Advanced';

    const editorStgsParent = editorStgs.parentNode;
    editorStgsParent.removeChild(editorStgs);
    editorInputs.insertBefore(editorStgs, dreamBtn);

    const editorModsParent = editorMods.parentNode;
    editorModsParent.removeChild(editorMods);
    const editorInputsPrompt = editorInputs.querySelector('#editor-inputs-prompt');
    editorInputs.insertBefore(editorMods, editorInputsPrompt);


    const collapsible = editorMods.querySelectorAll('.collapsible');
    collapsible.forEach((el) => {
        el.classList.remove('active');
    });

    const editorStgsCloseBtn = document.createElement('button');
    editorStgsCloseBtn.className = 'btn btn-default';
    editorStgsCloseBtn.style.padding = '5px 10px';
    editorStgsCloseBtn.style.maxWidth = '30px';
    editorStgsCloseBtn.textContent = 'X';
    editorStgsCloseBtn.addEventListener('click', () => {
        editorStgsTitle.classList.remove('active');
        editorStgs.querySelector('#editor-settings-entries').style.display = 'none';
    });
    const editorStgsEntries = editorStgs.querySelector('#editor-settings-entries');
    editorStgsEntries.querySelector('.settings-subheader').insertAdjacentElement('afterend', editorStgsCloseBtn);


    const promptLabel = editorInputsPrompt.querySelector('label');
    const smallTag = editorInputsPrompt.querySelector('small');
    const fileButton = editorInputsPrompt.querySelector('#promptsFromFileBtn');
    const promptToolbar = editorInputsPrompt.querySelector('#prompt-toolbar');
    const promptTextarea = editorInputsPrompt.querySelector('#prompt');
    promptLabel.style = 'cursor: pointer;';
    promptLabel.addEventListener('click', () => {
        if (promptTextarea.style.display === 'none') {
            promptTextarea.style.display = 'block';
        } else {
            promptTextarea.style.display = 'none';
        }
    });


    const promptWrapper = document.createElement('div');
    promptWrapper.id = 'editor-prompt';
    promptWrapper.style = `
            display: grid;
            grid-template-rows: 1fr auto;
            grid-template-columns: repeat(4, 1fr);
            justify-items: space-between;
            align-items: center;
            background: var(--background-color4);
            border: 1px solid var(--background-color3);
            border-radius: 7px;
            padding: 7px;
            margin-bottom: 10px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
        `;
    promptLabel.innerHTML = '<i class="icon">📝</i> <b>Prompt</b>';
    const fileButtonI = document.createElement('i');
    fileButtonI.className = 'icon smallButton';
    fileButtonI.textContent = '📄';
    fileButton.textContent = 'File';
    fileButton.insertBefore(fileButtonI, fileButton.firstChild);
    promptWrapper.appendChild(promptLabel);
    smallTag.innerText = '';
    promptWrapper.appendChild(smallTag);
    promptWrapper.appendChild(promptToolbar);
    promptWrapper.appendChild(fileButton);
    promptWrapper.appendChild(promptTextarea);
    const promptFromFile = editorInputsPrompt.querySelector('#prompt_from_file');
    promptFromFile.insertAdjacentElement('beforebegin', promptWrapper);
    const imageModBtn = editorInputsPrompt.querySelector('#image-modifier-dropdown');
    imageModBtn.textContent = '🌈 Style';
    const embeddingBtn = editorInputsPrompt.querySelector('#embeddings-button');
    embeddingBtn.textContent = '🪡 Embeds';
    const emeddingDialog = document.getElementById('embeddings-dialog');
    const emeddingDialogH4 = emeddingDialog.querySelector('h4');
    emeddingDialogH4.textContent = '🪡 Embeddings';

    const negativeLabel = editorInputs.querySelector('label[for="negative_prompt"]');
    const negativeEmbeddingsBtn = editorInputs.querySelector('#negative-embeddings-button');
    const negativePrompt = negativeEmbeddingsBtn.nextElementSibling;
    const negativeWrapper = document.createElement('div');
    negativeWrapper.id = 'editor-negative-prompt';
    negativeWrapper.style = `
            background: var(--background-color4);
            border: 1px solid var(--background-color3);
            border-radius: 7px;
            padding: 7px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
        `;
    negativeWrapper.appendChild(negativeLabel);
    negativeWrapper.appendChild(negativeEmbeddingsBtn);
    negativeWrapper.appendChild(negativePrompt);
    promptWrapper.insertAdjacentElement('afterend', negativeWrapper);

    const editorInputsInitImage = document.querySelector('#editor-inputs-init-image');
    editorInputsInitImage.classList.add('panel-box');
    const editorInputsInitImageLabel = editorInputsInitImage.querySelector('label');
    const initTitle = document.createElement('h4');
    initTitle.innerHTML = '🖼️ Upload Image ';
    initTitle.style = 'cursor: pointer;';
    const editorInputsInitImageI = editorInputsInitImage.querySelector('i');
    initTitle.appendChild(editorInputsInitImageI);
    editorInputsInitImage.replaceChild(initTitle, editorInputsInitImageLabel);
    const imgPreview = editorInputsInitImage.querySelector('.image_preview_container');
    const colorCorrect = editorInputsInitImage.querySelector('#apply_color_correction_setting');
    imgPreview.style = 'display: none !important;';
    initTitle.addEventListener('click', () => {
        if (imgPreview.style.display === 'flex') {
            imgPreview.style = 'display: none !important;';
            colorCorrect.style = 'display: none !important;';
        } else {
            imgPreview.style = 'display: flex !important;';
            colorCorrect.style = 'display: flex !important;';
        }
    });

    const initBtns = editorInputsInitImage.querySelector('#init_image_buttons');
    const initBtnsChildren = initBtns.children;
    for (let i = 0; i < initBtnsChildren.length; i++) {
        let el = initBtnsChildren[i];
        const newI = document.createElement('i');
        newI.className = 'icon';
        if (el.innerHTML.includes('Browse')) {
            newI.textContent = '⬆️';
            el.replaceChild(newI, el.querySelector('i'));
        } else if (el.innerHTML.includes('Draw')) {
            newI.textContent = '✏️';
            el.replaceChild(newI, el.querySelector('i'));
        } else if (el.innerHTML.includes('Inpaint')) {
            el = el.firstElementChild;
            newI.textContent = '🖌️';
            el.replaceChild(newI, el.querySelector('i'));
        }
    }

    const editorElementsBtn = document.createElement('button');
    editorElementsBtn.id = 'editor-elements-btn';
    editorElementsBtn.className = 'btn btn-default';
    editorElementsBtn.textContent = '🔽';
    editorElementsBtn.addEventListener('click', () => {
        if (isEditorOpen) {
            editorElementsBtn.textContent = '🔼';
            editorStgs.style.display = 'none';
            editorInputsPrompt.style.display = 'none';
            editorInputsInitImage.style.display = 'none';
            editor.style.height = 'min-content !important';
            isEditorOpen = false;
        } else {
            editorElementsBtn.textContent = '🔽';
            editorStgs.style.display = 'block';
            editorInputsPrompt.style.display = 'block';
            editorInputsInitImage.style.display = 'block';
            editor.style.height = 'min-content !important';
            isEditorOpen = true;
        }
        updateLayout();
    });

    editor.insertBefore(editorElementsBtn, editor.querySelector('#editor-inputs'));

    const clearAllPreviewsBtn = document.getElementById('clear-all-previews');
    const clearAllPreviewsBtnI = document.createElement('i');
    clearAllPreviewsBtnI.className = 'icon';
    clearAllPreviewsBtnI.textContent = '🗑️';
    clearAllPreviewsBtn.textContent = ' Clear All';
    clearAllPreviewsBtn.insertBefore(clearAllPreviewsBtnI, clearAllPreviewsBtn.firstChild);

    const showDownloadPopupBtnI = document.createElement('i');
    showDownloadPopupBtnI.className = 'icon';
    showDownloadPopupBtnI.textContent = '📥';
    showDownloadPopupBtn.textContent = ' Save All';
    showDownloadPopupBtn.insertBefore(showDownloadPopupBtnI, showDownloadPopupBtn.firstChild);

    const autoScrollBtn = document.getElementById('auto_scroll_btn');
    const autoScrollBtnI = autoScrollBtn.querySelector('i');
    autoScrollBtnI.className = 'icon';
    autoScrollBtnI.textContent = '📜';

    const autoScrollBtnAdjacent = autoScrollBtn.nextElementSibling;
    const autoScrollBtnAdjacentI = autoScrollBtnAdjacent.querySelector('i');
    autoScrollBtnAdjacentI.className = 'icon';
    autoScrollBtnAdjacentI.textContent = '🔍';

    const imgDetailsBtn = document.createElement('button');
    imgDetailsBtn.textContent = ' Show Details';
    imgDetailsBtn.className = 'btn btn-default';
    imgDetailsBtn.style.padding = '5px 10px';
    imgDetailsBtn.style.marginRight = '5px';
    let showDetails = false;
    const previewContent = document.getElementById('preview-content');
    imgDetailsBtn.addEventListener('click', () => {
        showDetails = !showDetails;
        const imageTaskContainer = previewContent.querySelectorAll('.imageTaskContainer');
        imageTaskContainer.forEach((el) => {
            hideDetails(el);
        });
    });

    const imgDetailsBtnI = document.createElement('i');
    imgDetailsBtnI.className = 'icon';
    imgDetailsBtnI.textContent = '📝';
    imgDetailsBtn.insertBefore(imgDetailsBtnI, imgDetailsBtn.firstChild);
    showDownloadPopupBtn.insertAdjacentElement('afterend', imgDetailsBtn);

    const fullScreenBtn = document.createElement('button');
    fullScreenBtn.textContent = ' Fullscreen';
    fullScreenBtn.className = 'btn btn-default';
    fullScreenBtn.style.padding = '5px 10px';
    fullScreenBtn.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            toggleEditor(snapThreshold);
            topNav.style.display = 'flex';
        } else {
            document.documentElement.requestFullscreen();
            toggleEditor(0);
            topNav.style.display = 'none';
        }
        updateLayout();
    });

    const fullScreenBtnI = document.createElement('i');
    fullScreenBtnI.className = 'icon';
    fullScreenBtnI.textContent = '🖥️';
    fullScreenBtn.insertBefore(fullScreenBtnI, fullScreenBtn.firstChild);
    imgDetailsBtn.insertAdjacentElement('afterend', fullScreenBtn);

    const undoBtn = document.getElementById('undo');
    const undoBtnI = undoBtn.querySelector('i');
    undoBtnI.className = 'icon';
    undoBtnI.textContent = '↩️';

    const mergeSingle = document.getElementById('tab-merge-opts-single');
    const mergeSpan = mergeSingle.querySelector('span');
    const mergeI = document.createElement('i');
    mergeI.className = 'icon';
    mergeI.textContent = '📄';
    mergeSpan.textContent = 'Single File';
    mergeSpan.insertBefore(mergeI, mergeSpan.firstChild);

    const mergeMulti = document.getElementById('tab-merge-opts-batch');
    const multiSpan = mergeMulti.querySelector('span');
    const multiI = document.createElement('i');
    multiI.className = 'icon';
    multiI.textContent = '📑';
    multiSpan.textContent = 'Multiple Files';
    multiSpan.insertBefore(multiI, multiSpan.firstChild);

    const imgEditorBtns = document.querySelectorAll('.image-editor-button');
    imgEditorBtns.forEach((el) => {
        const i = el.querySelector('i');
        i.className = 'icon';
        if (el.textContent.includes('Draw')) {
            i.textContent = '🖌️';
        } else if (el.textContent.includes('Erase')) {
            i.textContent = '🧽';
        } else if (el.textContent.includes('Fill')) {
            i.textContent = '🪣';
        } else if (el.textContent.includes('Picker')) {
            i.textContent = '💧'
            el.innerHTML.replace('Picker', 'Dropper');
        } else if (el.textContent.includes('Clear')) {
            i.textContent = '🧹';
        } else if (el.textContent.includes('Undo')) {
            i.textContent = '↩️';
        } else if (el.textContent.includes('Redo')) {
            i.textContent = '↪️';
        } else if (el.textContent.includes('Cancel')) {
            i.textContent = '❌';
        } else if (el.textContent.includes('Save')) {
            i.textContent = '💾';
        } else if (el.textContent.includes('Load mask from file')) {
            i.textContent = '⬆️';
            el.innerHTML.replace('Load mask from file', 'Select');
        }

    });

    const imgEditorTool = document.querySelectorAll('.image_editor_tool');
    imgEditorTool.forEach((el) => {
        const h4 = el.querySelector('h4');
        h4.innerHTML = '<i>⚒️</i><span style="white-space: nowrap;"> Tools</span>';
        h4.addEventListener('click', () => {
            if (el.querySelector('.editor-options-container').classList.contains('active') == false) {
                el.querySelector('.editor-options-container').classList.add('active');
            } else {
                el.querySelector('.editor-options-container').classList.remove('active');
            }
        });
    });

    const imgEditorColor = document.querySelectorAll('.image_editor_color');
    imgEditorColor.forEach((el) => {
        const h4 = el.querySelector('h4');
        h4.innerHTML = '<i>🎨</i><span style="margin-left: 2px; white-space: nowrap;"> Palette</span>';
        h4.addEventListener('click', () => {
            if (el.querySelector('.editor-options-container').classList.contains('active') == false) {
                el.querySelector('.editor-options-container').classList.add('active');
            } else {
                el.querySelector('.editor-options-container').classList.remove('active');
            }
        });
    });

    const imgEditorBrushSize = document.querySelectorAll('.image_editor_brush_size');
    imgEditorBrushSize.forEach((el) => {
        const h4 = el.querySelector('h4');
        h4.innerHTML = '<i>🖌️</i><span style="margin-left: 2px; white-space: nowrap;"> Brush Size</span>';
        h4.addEventListener('click', () => {
            if (el.querySelector('.editor-options-container').classList.contains('active') == false) {
                el.querySelector('.editor-options-container').classList.add('active');
            } else {
                el.querySelector('.editor-options-container').classList.remove('active');
            }
        });
    });

    const imgEditorOpacity = document.querySelectorAll('.image_editor_opacity');
    imgEditorOpacity.forEach((el) => {
        const h4 = el.querySelector('h4');
        h4.innerHTML = '<i>🌫️</i><span style="margin-left: 2px; white-space: nowrap;"> Opacity</span>';
        h4.addEventListener('click', () => {
            if (el.querySelector('.editor-options-container').classList.contains('active') == false) {
                el.querySelector('.editor-options-container').classList.add('active');
            } else {
                el.querySelector('.editor-options-container').classList.remove('active');
            }
        });
    });

    const imgEditorSharpness = document.querySelectorAll('.image_editor_sharpness');
    imgEditorSharpness.forEach((el) => {
        const h4 = el.querySelector('h4');
        h4.innerHTML = '<i>🔪</i><span style="margin-left: 2px; white-space: nowrap;"> Sharpness</span>';
        h4.addEventListener('click', () => {
            if (el.querySelector('.editor-options-container').classList.contains('active') == false) {
                el.querySelector('.editor-options-container').classList.add('active');
            } else {
                el.querySelector('.editor-options-container').classList.remove('active');
            }
        });
    });

    const footer = document.getElementById('footer');
    const footSpacer = document.getElementById('footer-spacer');
    footer.parentNode.removeChild(footer);
    footSpacer.parentNode.removeChild(footSpacer);

    const dialog = document.createElement('dialog');
    dialog.id = 'footer-popup';
    dialog.style = `
            margin: auto;
            padding: 20px;
            border: none;
            background: var(--background-color2);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        `;
    dialog.appendChild(footer);
    const acceptButton = document.createElement('button');
    acceptButton.textContent = 'Accept';
    acceptButton.style = `
            display: block;
            margin: 10px auto;
            padding: 5px 10px;
            background: #3d9970;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        `;
    acceptButton.addEventListener('click', () => {
        dialog.close();
    });
    dialog.appendChild(acceptButton);
    document.body.appendChild(dialog);
    dialog.showModal();

    const hideDetails = (el) => {
        const headerContent = el.querySelector('.header-content');
        const headerContentChildren = headerContent.children;

        for (let i = 0; i < headerContentChildren.length; i++) {
            if (headerContentChildren[i].classList.contains('progress-bar')) {
                const progress = headerContentChildren[i];
                if (progress.style.height === '0px') {
                    headerContentChildren[i].style.display = showDetails ? 'block' : 'none';
                    headerContent.style.display = showDetails ? 'grid' : 'none';
                    // remove padding from parent
                    el.style.padding = showDetails ? '10px' : '0';
                    el.style.border = showDetails ? '1px solid var(--background-color2)' : 'none';
                    el.style.boxShadow = showDetails ? '0 4px 8px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.15)' : 'none';
                    // remove padding from .imgItem
                    const imgItem = el.querySelector('.imgItem');
                    imgItem.style.padding = showDetails ? '0 10px' : '0';
                    imgItem.style.boxShadow = !showDetails ? '0 4px 8px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.15)' : 'none';
                }
            }
        }
    };

    const updateInitText = (imgWidth, imgHeight) => {
        const initialText = document.getElementById('initial-text');
        let thumbnailSize = document.getElementById('thumbnail_size-input').value;
        const gridContainer = document.createElement('div');
        const landscape = window.innerWidth > 960 ? true : false;
        const availableWidth = landscape ? document.body.clientWidth - editor.clientWidth - 100 : document.body.clientWidth - 100;
        let scaledWidth = imgWidth * thumbnailSize / 100;
        let scaledHeight = imgHeight * thumbnailSize / 100;
        if (scaledWidth > availableWidth) {
            const scale = scaledWidth / availableWidth;
            scaledWidth = scaledWidth / scale;
            scaledHeight = scaledHeight / scale;
        }

        gridContainer.style = `
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
            `;
        function createSquare() {
            const square = document.createElement('div');
            square.style = `
                    position: relative;
                    width: ${scaledWidth}px;
                    height: ${scaledHeight}px;
                    margin: 10px;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
                `;

            const squareInner = document.createElement('div');
            squareInner.style = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: ${scaledWidth}px;
                    height: ${scaledHeight}px;
                    border: 2px solid;
                    border-color: red;
                    border-image: linear-gradient(to bottom right, red, orange, yellow, green, blue, indigo, violet) 1;
                    background: var(--background-color3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;

            const octagon = document.createElement('div');
            octagon.style = `
                    width: calc(100% / 9);
                    height: calc(100% / 9);
                    background: conic-gradient(from -90deg, red, orange, yellow, green, blue, indigo, violet, red);
                    clip-path: polygon(30% 0, 70% 0, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0 70%, 0 30%);
                    opacity: 0.5;
                    animation: spin 12s linear infinite;
                `;

            squareInner.appendChild(octagon);
            square.appendChild(squareInner);
            return square;
        }
        for (let i = 0; i < 4; i++) {
            const square = createSquare();
            gridContainer.appendChild(square);
        }
        initialText.innerHTML = '';
        initialText.appendChild(gridContainer);
    }

    const updateLayout = () => {        
        let imgWidth = parseInt(document.getElementById('width').value);
        let imgHeight = parseInt(document.getElementById('height').value);
        const tabContentMain = document.getElementById('tab-content-main');
        const tabContentSettings = document.getElementById('tab-content-settings');
        const tabContentAbout = document.getElementById('tab-content-about');
        const tabContentMerge = document.getElementById('tab-content-merge');
        const tabContentNews = document.getElementById('tab-content-news');
        const tabContentHeight = `calc(100dvh - ${topNav.clientHeight}px)`;
        tabContentMain.style.height = tabContentHeight;
        tabContentSettings.style.height = tabContentHeight;
        tabContentAbout.style.height = tabContentHeight;
        tabContentMerge.style.height = tabContentHeight;
        tabContentNews.style.height = tabContentHeight;

        if (!initialText.classList.contains('displayNone')) {
            updateInitText(imgWidth, imgHeight);
        }

        const imageTaskContainers = document.querySelectorAll('.imageTaskContainer');
        imageTaskContainers.forEach((el) => {
            const stopTask = el.querySelector('.stopTask');
            const stopTaskI = stopTask.querySelector('i');
            stopTaskI.className = 'icon';
            if (stopTask.textContent.includes('Remove')) {
                stopTaskI.textContent = '🗑️';
            } else if (stopTask.textContent.includes('Stop')) {
                stopTaskI.textContent = '⏹️';
            } else if (stopTask.textContent.includes('Cancel')) {
                stopTaskI.textContent = '❌';
            }

            const useSettings = el.querySelector('.useSettings');
            const useSettingsI = useSettings.querySelector('i');
            useSettingsI.className = 'icon';
            useSettingsI.textContent = '♻️';
            useSettings.textContent = 'ReUse';
            useSettings.insertBefore(useSettingsI, useSettings.firstChild);


            let naturalWidth = imgWidth;
            const imgs = el.querySelectorAll('img');
            imgs.forEach((el) => {
                naturalWidth = el.naturalWidth !== naturalWidth ? el.naturalWidth : naturalWidth;
            });
            updatePreview(el, naturalWidth);
        });
    }

    const updatePreview = (el, naturalWidth) => {
        const landscape = window.innerWidth > 960 ? true : false;
        const imgPreview = el.querySelectorAll('.img-preview');
        const imgs = el.querySelectorAll('img');
        const imgCount = imgs.length > 0 ? imgs.length : 1;
        const thumbnailSize = document.getElementById('thumbnail_size-input').value;
        let scaledWidth = naturalWidth * thumbnailSize / 100;
        const padding = scaledWidth * 0.2 * imgCount;
        let totalWidth = scaledWidth * imgCount + padding;
        const availableHeight = landscape ? document.body.clientHeight - topNav.clientHeight : document.body.clientHeight - topNav.clientHeight - editor.clientHeight;
        const availableWidth = landscape ? document.body.clientWidth - editor.clientWidth : document.body.clientWidth;
        const newWidth = totalWidth > availableWidth ? availableWidth : totalWidth;
        
        // console.log(`totalWidth: ${totalWidth}, imgLength: ${imgCount}, naturalWidth: ${naturalWidth}`);

        preview.style = `
            height: ${availableHeight}px !important;
            width: ${availableWidth}px !important;
        `;

        initialText.style = `
            height: ${availableHeight}px !important;
            width: ${availableWidth}px !important;
        `;
        
        el.style = `
                display: inline-block;
                float: left;
                text-align: left;
                width: ${newWidth}px !important;
                margin: 10px;
                `;

        imgPreview.style = `
                text-align: center;
                `;

        hideDetails(el);
    };

    let isEditorOpen = true; // default
    const snapThreshold = 520; // default
    const toggleEditor = (newEditorWidth) => {
        if (typeof newEditorWidth === 'undefined') {
            newEditorWidth = isEditorOpen ? 0 : snapThreshold;
        }
        editor.style.width = `${newEditorWidth}px`;
        if (newEditorWidth === 0) {
            editor.style.display = 'none';
            toggleBtn.textContent = '▶️';
            isEditorOpen = false;+
            previewTools.appendChild(dreamBtn);
        } else {
            editor.style.display = 'block';
            toggleBtn.textContent = '◀️';
            isEditorOpen = true;
            editor.appendChild(dreamBtn);
        }
        updateLayout();
    };

    toggleBtn.addEventListener('click', () => {
        if (isEditorOpen) {
            toggleEditor(0);
        } else {
            toggleEditor(snapThreshold);
        }
        updateLayout();
    });

    const note = editorInputs.nextElementSibling;
    note.parentNode.removeChild(note);

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type == "childList") {
                const numOutputsTotal = document.getElementById('num_outputs_total');
                if (mutation.target.innerHTML.includes('Make')) {
                    // #num_outputs_total
                    mutation.target.innerHTML = ` Dream (${numOutputsTotal.value})`;
                    dreamBtnI.textContent = '✨';
                    mutation.target.insertBefore(dreamBtnI, mutation.target.firstChild);
                    editor.style.height = 'min-content !important';
                } else if (mutation.target.innerHTML.includes('Enqueue')) {
                    mutation.target.innerHTML = ` Keep Dreaming (${numOutputsTotal.value})`;
                    dreamBtnI.textContent = '🤯';
                    mutation.target.insertBefore(dreamBtnI, mutation.target.firstChild);
                    editor.style.height = 'min-content !important';
                } else if (mutation.target.innerHTML == 'Remove') {
                    mutation.target.innerHTML = '🗑️';
                    editor.style.height = 'min-content !important';
                }

                const editorControlsCenter = document.querySelector('.editor-controls-center');
                const editorControlsCenterDiv = editorControlsCenter.querySelector('div');
                const editorControlsCenterDivStyle = `
                        display: flex !important;
                        flex-direction: row !important;
                        justify-content: center !important;
                        align-items: center !important;
                        width: 100% !important;
                        height: auto !important;
                        cursor: ${editorControlsCenterDiv.style.cursor} !important;
                        `;
                editorControlsCenter.style = editorControlsCenterDivStyle;
            }
            updateLayout();
        });
    });
    observer.observe(dreamBtn, { childList: true });
    window.addEventListener('resize', updateLayout);
    const previewContentObserver = new MutationObserver(function (mutations) {
        mutations.forEach(() => {
            updateLayout();
            const imgPreview = document.querySelectorAll('.img-preview');
            imgPreview.forEach((el) => {
                // listen for added children and sub children
                const imgPreviewObserver = new MutationObserver(function (mutations) {
                    mutations.forEach((mutation) => {
                        // if add img to .img-batch update layout
                        if (mutation.target.classList.contains('img-batch')) {
                            // wait for img to load
                            const img = mutation.target.querySelector('img');
                            img.addEventListener('load', () => {
                                updateLayout();
                            });
                        }
                    });
                });
                imgPreviewObserver.observe(el, { childList: true, subtree: true });
            });
        });
    });
    previewContentObserver.observe(previewContent, { childList: true });
    // listen for changes in .thumbnail_size-input value and update layout
    const thumbnailSizeInput = document.getElementById('thumbnail_size-input');
    thumbnailSizeInput.addEventListener('change', () => {
        updateLayout();
    });
    updateLayout();
})();