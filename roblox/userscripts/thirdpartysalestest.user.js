// ==UserScript==
// @name         Give me money
// @version      0.1
// @description  roblox item test thing shhh
// @author       You
// @match        https://www.roblox.com/catalog/*
// @match        https://web.roblox.com/catalog/*
// @icon         https://www.google.com/s2/favicons?domain=roblox.com
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function() {
    let button = document.querySelector("button.PurchaseButton")
    if (button) {
        console.log(button.parentElement)
        let clone = button.cloneNode()
        clone.innerText="Give me money"
        button.parentElement.appendChild(clone)
        clone.onclick=function(){
            fetch(`https://economy.roblox.com/v1/purchases/products/${button.dataset.productId}`,{body:JSON.stringify({"expectedCurrency": 1,"expectedPrice":button.dataset.expectedPrice,"expectedSellerId": 0, expectedPromoId: 0, expectedSellerId:0, saleLocationId: 8910542885, saleLocationType: "Game", userAssetId: 0}),method:"POST",credentials:"include",headers:{"Content-Type":"application/json","x-csrf-token":Roblox.XsrfToken.getToken()}})
        }
    }
})();
