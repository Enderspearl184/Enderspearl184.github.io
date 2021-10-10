// ==UserScript==
// @name         Weaker Shaky Site
// @version      0.1
// @description  Shaky Site but it shakes less and isn't just on hover! Enjoy!!!
// @author       Enderspearl184
// @match        https://*.brick-hill.com/*
// @icon         https://www.google.com/s2/favicons?domain=brick-hill.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function addGlobalStyle(href) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('link');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = href;
        head.appendChild(style);
    }
    addGlobalStyle('https://enderspearl184.github.io/brickhill/css/weakshake.css');
    // Your code here...
})();
