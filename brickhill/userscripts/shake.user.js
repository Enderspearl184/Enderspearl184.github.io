// ==UserScript==
// @name         Shaky Site
// @version      0.1
// @description  Using css from the blog, experience the site in the way it definitely wasn't meant to be viewed!
// @author       Enderspearl184
// @match        https://www.brick-hill.com/*
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
    addGlobalStyle('https://enderspearl184.github.io/brickhill/css/shake.css');
    // Your code here...
})();
