// ==UserScript==
// @name         Join Data Copier
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Enderspearl184
// @match        https://*.brick-hill.com/play/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==
(async function(){
    const node = $.parseHTML($('#setpage-v')[0].__vue_app__._component.template)[0]
    const stuff = {
        address: node.getAttribute("set-ip"),
        id: node.getAttribute(":set-id"),
        port: node.getAttribute("set-port")
    }

    setTimeout(async function timeOut(){
        const playButton = document.getElementsByClassName('play-button')[0];
        if (!playButton) {
            setTimeout(timeOut,100)
            return
        }
        const copyButton = playButton.cloneNode();

        copyButton.className = copyButton.className.replace('play-button ', '')
        copyButton.textContent = 'COPY JOIN DATA';
        copyButton.onclick = () => {
            $.ajax({url:window.BH.apiUrl('v1/auth/generateToken?set='.concat(stuff.id)),xhrFields:{withCredentials:true}})
                .then(function(data){
                    navigator.clipboard.writeText(`{"token":"${data.token}","id":"${stuff.id}","port":"${stuff.port}","ip":"${stuff.address}"}`)
                    alert("Copied join data.")
                });
        }
        playButton.parentNode.append(copyButton);
    },100)
})();
