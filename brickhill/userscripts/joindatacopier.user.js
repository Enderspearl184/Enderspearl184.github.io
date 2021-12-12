// ==UserScript==
// @name         Join Data Copier
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Enderspearl184
// @match        https://*.brick-hill.com/play/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==
setTimeout(function(){
const stuff = {
    address: window.BH.apps.SetPage.$children[0].setIp,
    id: window.BH.apps.SetPage.$children[0].setId,
    port: window.BH.apps.SetPage.$children[0].setPort
}
const playButton = document.getElementsByClassName('play-button')[0];
const copyButton = playButton.cloneNode();

copyButton.className = copyButton.className.replace('play-button ', '').replace('green', 'red');
copyButton.textContent = 'Copy Join Data';
copyButton.onclick = () => {
    window.axios.get(window.BH.apiUrl('v1/auth/generateToken?set='.concat(stuff.id)))
        .then(function({data}){
            navigator.clipboard.writeText(`{"token":"${data.token}","id":"${stuff.id}","port":"${stuff.port}","ip":"${stuff.address}"}`)
        });
}

playButton.parentNode.append(copyButton);
},500)
