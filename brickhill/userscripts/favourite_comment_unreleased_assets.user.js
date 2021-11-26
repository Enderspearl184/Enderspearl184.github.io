// ==UserScript==
// @name         Comment/Favourite Nonexistent Items
// @version      0.1
// @description  using the api to do it is lame
// @author       Enderspearl184
// @include      https://www.brick-hill.com/play/*
// @include      https://www.brick-hill.com/shop/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const token=document.querySelector('meta[name="csrf-token"]').getAttribute('content'); //token is used for the comment form
    const query=document.querySelector('span[style="font-weight:600;font-size:3rem;display:block;"]');
    let polymorphic_type=1;
    if (query) {
        //it errored!!
        let pathSplit=location.pathname.split("/");
        if (pathSplit[1]=="play") polymorphic_type=3;
        const assetId=pathSplit[2]
        query.parentNode.innerHTML+=`<button onclick="axios.post('https://www.brick-hill.com/favorites/create',{'favoriteable_id':'${assetId}','polymorphic_type':'${polymorphic_type}','toggle':true})">Favourite</button><button onclick="axios.post('https://www.brick-hill.com/favorites/create',{'favoriteable_id':'${assetId}','polymorphic_type':'${polymorphic_type}','toggle':false})">Unfavourite</button><form method="POST" action="/comments/create"><input type="hidden" name="_token" value="${token}"><br><input type="hidden" name="commentable_id" value="${assetId}"><input type="hidden" name="polymorphic_type" value="${polymorphic_type}"><textarea name="comment" placeholder="Enter Comment"></textarea><input type="submit" value="Post Comment" class="button blue"></form>`
    }
    // Your code here...
})();
