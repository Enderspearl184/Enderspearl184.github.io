// ==UserScript==
// @name         purchase donator
// @version      0.2
// @description  gives me (or other people) the commission bonus when you buy catalog items (except t-shirts, shirts, pants, and bundles)
// @author       Enderspearl184
// @match        https://www.roblox.com/catalog/*
// @match        https://web.roblox.com/catalog/*
// @match        https://www.roblox.com/game-pass/*
// @match        https://web.roblox.com/game-pass/*
// @icon         https://www.google.com/s2/favicons?domain=roblox.com
// @run-at       document-end
// @grant        none
// ==/UserScript==

//if you can't purchase limiteds from other users onsite then uh disable this script
//it MIGHT work on limiteds (untested) but i don't think you can buy items in game so probably not

const PLACE_ID = 8910542885; //the place id to send as the sale origin, gives the place owner 40% of the item cost
                             //also, it probably doesn't give you the commission if the place is owned by you because roblox isn't dumb, maybe try it with a group game or something idk.
                             //the only items that i KNOW don't give 40% of the cost are t-shirts, shirts, pants, and bundles.
(function() {
    let button = document.querySelector("button.PurchaseButton")
    if (button) {
        button.onclick=function(){
            setTimeout(function(){
                let confirm = document.getElementById("confirm-btn") //find the confirm button for purchasing
                let confirmParent = confirm.parentElement //find it's parent
                confirm.remove() //goodbye confirm button rip bozo
                confirmParent.innerHTML = `<a href="" id="confirm-btn" class="btn-primary-md">Get Now</a>`+ confirmParent.innerHTML + `<br><br><div class="modal-footer text-footer modal-footer-center">If eligible, 40% of the cost will go to the creator of place <a href=/games/${PLACE_ID}>${PLACE_ID}</a></div>` //add the button back without the default script on click
                confirmParent.children[0].onclick = function() { //when you click confirm buy the item with the origin as the specified place id
                    fetch(`https://economy.roblox.com/v1/purchases/products/${button.dataset.productId}`,{body:JSON.stringify({"expectedCurrency": 1,"expectedPrice":button.dataset.expectedPrice,"expectedSellerId": 0, expectedPromoId: 0, expectedSellerId:0, saleLocationId: PLACE_ID, saleLocationType: "Game", userAssetId: (button.dataset.userassetId || 0)}),method:"POST",credentials:"include",headers:{"Content-Type":"application/json","x-csrf-token":Roblox.XsrfToken.getToken()}})
                        .then(()=>{location=location.href}) //purchase the item with my place id, then refreshes the page
                   }
            },100)
        }
    }
})();
