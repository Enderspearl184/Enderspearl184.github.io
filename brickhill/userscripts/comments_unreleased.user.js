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
    window.getCookie = function(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    let query=document.querySelector('meta[name="og:title"]')
    if (query) query=query.getAttribute('content');
    while (!query) { //waiting until it exists because it's important!
        query=document.querySelector('meta[name="og:title"]')
        if (query) query=query.getAttribute('content');
        await sleep(0)
    }
    const polymorphic_type=1;
    if (query=="Not Authorized - Brick Hill") {
        let errortext=document.querySelector('span[style="font-weight:600;font-size:3rem;display:block;"]');
        while (!errortext) { //waiting until it exists just because document-start, and it looks better if it's IN the main container
            errortext=document.querySelector('span[style="font-weight:600;font-size:3rem;display:block;"]');
            await sleep(0)
        }
        //it errored!!
        let pathSplit=location.pathname.split("/");
        const assetId=pathSplit[2]
        errortext.parentElement.innerHTML+=`<button onclick="fetch('https://www.brick-hill.com/favorites/create',{body:JSON.stringify({'favoriteable_id':'${assetId}','polymorphic_type':'${polymorphic_type}','toggle':true}),credentials:'include',method:'POST',headers:{'Content-Type':'application/json','x-xsrf-token':window.getCookie('XSRF-TOKEN')}})">Favourite</button><button onclick="fetch('https://www.brick-hill.com/favorites/create',{body:JSON.stringify({'favoriteable_id':'${assetId}','polymorphic_type':'${polymorphic_type}','toggle':false}),credentials:'include',method:'POST',headers:{'Content-Type':'application/json','x-xsrf-token':window.getCookie('XSRF-TOKEN')}})">Unfavourite</button><shop-bottom id="shopbottom-v" item_id="${assetId}" starting_cursor=""></shop-bottom>`
        //errortext.parentElement.innerHTML+=`<button onclick="axios.post('https://www.brick-hill.com/favorites/create',{'favoriteable_id':'${assetId}','polymorphic_type':'${polymorphic_type}','toggle':true})">Favourite</button><button onclick="axios.post('https://www.brick-hill.com/favorites/create',{'favoriteable_id':'${assetId}','polymorphic_type':'${polymorphic_type}','toggle':false})">Unfavourite</button><shop-bottom id="shopbottom-v" item_id="${assetId}" starting_cursor=""></shop-bottom>`
        setTimeout(()=>{if (!document.querySelector("vue-comp[id='shopbottom-v']")){location.reload()}},3000) //reload if the comments thing doesn't appear after 1.5 seconds
    }
    // Your code here...
})();
