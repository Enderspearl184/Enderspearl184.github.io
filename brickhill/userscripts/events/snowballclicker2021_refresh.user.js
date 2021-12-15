// ==UserScript==
// @name         Auto-Refreshing Snowball Clicker
// @version      1.0
// @description  Auto refreshes, to get snowballs fast! Open multiple windows (not just tabs) if you need them to appear even faster
// @author       Enderspearl184
// @match        https://www.brick-hill.com/*
// @grant        none
// ==/UserScript==

(function() {
    setTimeout(function yo(){
        let snowball=document.querySelector(".snowball") //find html element
        if (snowball) {
            snowball.click() //click the element
            setTimeout(yo,1000)
        } else {
            window.location.reload() //loser it didnt show up
        }
    },1000) //fun
})();
