// ==UserScript==
// @name         Roblox 40%/10% off items
// @version      0.6
// @description  Pretend you bought items inside a game, giving you a discount of either 40% or 10% via commissions robux.
// @author       Enderspearl184
// @match        https://www.roblox.com/catalog/*
// @match        https://web.roblox.com/catalog/*
// @match        https://www.roblox.com/game-pass/*
// @match        https://web.roblox.com/game-pass/*
// @match        https://www.roblox.com/games/*
// @match        https://web.roblox.com/games/*
// @match        https://www.roblox.com/bundles/*
// @match        https://web.roblox.com/bundles/*
// @match        https://www.roblox.com/library/*
// @match        https://web.roblox.com/library/*
// @icon         https://www.google.com/s2/favicons?domain=roblox.com
// @run-at       document-end
// @grant        none
// ==/UserScript==


const PLACE_ID = 9336310638; //the place id to send as the sale origin, gives the place owner 40% of the item cost
                             //on T-Shirts, Classic Shirts and Classic Pants, it only gives the place owner 10% of the cost.
                             //buying limiteds will work, but no commission robux will be given

(function() {
    setInterval(()=>{
    let buttons = document.querySelectorAll("button.PurchaseButton") //find purchase button
    buttons.forEach((button)=>{
        if (button.modified) return
        console.log("modifying button")
        button.modified=true
        button.onclick = function() { //when you click it
            setTimeout(function() {
                let confirm = document.getElementById("confirm-btn") //find the confirm button for purchasing
                let confirmParent = confirm.parentElement //find its parent
                confirm.remove() //goodbye confirm button rip bozo
                //add the button back but without the normal confirm button script firing
                confirmParent.innerHTML = `<a id="confirm-btn" class="btn-primary-md">Get Now</a>` + confirmParent.innerHTML + `<br><br><div class="modal-footer text-footer modal-footer-center">If eligible, 40% of the cost will go to the creator of place <a href=/games/${PLACE_ID}>${PLACE_ID}</a></div>`
                confirmParent.children[0].onclick = function() { //when you click the confirm button do this
                    fetch(`https://economy.roblox.com/v1/purchases/products/${button.dataset.productId}`, {
                            body: JSON.stringify({
                                expectedCurrency: 1, //expectedcurrency 1 is just robux
                                expectedPrice: button.dataset.expectedPrice, //pretty self-explanatory
                                expectedSellerId: button.dataset.expectedSellerId, //0, //idk why its 0 here but that's how it gets sent in game so idc
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
                            location.reload(true) //actually reload the page because for some reason location.reload() doesn't change the item owned sign.
                        })
                }
            }, 25)
        }
    })
    },100)
})();
