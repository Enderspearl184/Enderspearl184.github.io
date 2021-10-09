// ==UserScript==
// @name         Brick Hill Halloween 2021 Style
// @version      0.1
// @description  Keep the 2021 Halloween Style Forever!
// @author       You
// @match        https://*.brick-hill.com/*
// @icon         https://www.google.com/s2/favicons?domain=www.brick-hill.com
// @grant        none
// ==/UserScript==

(function() {
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
    let i=1;
    document.getRootNode().children[0].className='theme-halloween';
    for (let link of document.querySelectorAll('link')) {
        if (link.rel=="stylesheet") {
            if (i==1) {
                link.href="https://enderspearl184.github.io/brickhill/css/halloween2021.css";
                i++
            } else {
                link.href="https://enderspearl184.github.io/brickhill/css/halloween2021main.css";
            }
        }
    }
    //addGlobalStyle("https://enderspearl184.github.io/brickhill/css/halloween2021.css");
    //addGlobalStyle("https://enderspearl184.github.io/brickhill/css/halloween2021main.css");
})();
