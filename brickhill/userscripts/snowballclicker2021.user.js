// ==UserScript==
// @name         Snowball Clicker
// @version      1.0
// @description  Clicks snowballs but doesn't auto refresh.
// @author       Enderspearl184
// @match        https://www.brick-hill.com/*
// @grant        none
// ==/UserScript==

(function() {
    setTimeout(function yo(){
        let snowball=document.querySelector(".snowball") //find html element
        if (snowball) {
            snowball.click() //click the element
        }
    },1000) //fun
})();
