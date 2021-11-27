// ==UserScript==
// @name         Comment/Favourite Unreleased Items
// @version      0.1
// @description  using the api to do it is lame
// @author       Enderspearl184
// @include      https://www.brick-hill.com/shop/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function() {
    //'use strict';
    const query=document.querySelector('meta[name="og:title"]').getAttribute('content');
    while (!query) { //waiting until it exists because it's important!
        query=document.querySelector('meta[name="og:title"]').getAttribute('content');
        await sleep(1)
    }
    const polymorphic_type=1;
    if (query=="Not Authorized - Brick Hill") {
        let errortext=document.querySelector('span[style="font-weight:600;font-size:3rem;display:block;"]');
        while (!errortext) { //waiting until it exists just because document-start, and it looks better if it's IN the main container
            errortext=document.querySelector('span[style="font-weight:600;font-size:3rem;display:block;"]');
            await sleep(1)
        }
        //it errored!!
        let pathSplit=location.pathname.split("/");
        const assetId=pathSplit[2]
        errortext.parentElement.innerHTML+=`<button onclick="axios.post('https://www.brick-hill.com/favorites/create',{'favoriteable_id':'${assetId}','polymorphic_type':'${polymorphic_type}','toggle':true})">Favourite</button><button onclick="axios.post('https://www.brick-hill.com/favorites/create',{'favoriteable_id':'${assetId}','polymorphic_type':'${polymorphic_type}','toggle':false})">Unfavourite</button><shop-bottom id="shopbottom-v" item_id="${assetId}" starting_cursor=""></shop-bottom>`
        setTimeout(()=>{if (!document.querySelector("div[id='shopbottom-v']")){location.reload()}},1500) //reload if the comments thing doesn't appear after 1.5 seconds
    }
    // Your code here...
})();
