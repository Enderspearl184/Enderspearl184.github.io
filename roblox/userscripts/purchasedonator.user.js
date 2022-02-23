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
    let button = document.querySelector("button.PurchaseButton") //find purchase button
    if (button) {
        button.onclick = function() { //when you click it
            setTimeout(function() {
                let confirm = document.getElementById("confirm-btn") //find the confirm button for purchasing
                let confirmParent = confirm.parentElement //find it's parent
                confirm.remove() //goodbye confirm button rip bozo
                //add the button back but without the normal confirm button script firing
                confirmParent.innerHTML = `<a href="" id="confirm-btn" class="btn-primary-md">Get Now</a>` + confirmParent.innerHTML + `<br><br><div class="modal-footer text-footer modal-footer-center">If eligible, 40% of the cost will go to the creator of place <a href=/games/${PLACE_ID}>${PLACE_ID}</a></div>`
                confirmParent.children[0].onclick = function() { //when you click the confirm button do this
                    fetch(`https://economy.roblox.com/v1/purchases/products/${button.dataset.productId}`, {
                            body: JSON.stringify({
                                expectedCurrency: 1, //expectedcurrency 1 is just robux
                                expectedPrice: button.dataset.expectedPrice, //pretty self-explanatory
                                expectedSellerId: 0, //idk why its 0 here but that's how it gets sent in game so idc
                                expectedPromoId: 0, //also 0, just how it gets sent in game
                                saleLocationId: PLACE_ID, //send the place id as the sale location
                                saleLocationType: "Game", //and also that it was in a game
                                userAssetId: (button.dataset.userassetId || 0) //usually 0, just put this incase it possibly lets limiteds be purchased this way
                            }),
                            method: "POST", //it needs to be a post request
                            credentials: "include", //include credentials for authentication.
                            headers: {
                                "Content-Type": "application/json",
                                "x-csrf-token": Roblox.XsrfToken.getToken() //yes it needs the token to authenticate. economy.roblox.com is an actual roblox domain though, so it's not sent anywhere sketchy
                            }
                        })
                        .then(() => {
                            location = location.href //actually reload the page because for some reason location.reload() doesn't change the item owned sign.
                        })
                }
            }, 25)
        }
    }
})();
