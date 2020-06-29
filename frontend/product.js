var response;
const api = "http://localhost:3000/api/teddies"


//LOCAL STORAGE
let cart = localStorage
let itemsInCart;//create array for items
let qtyInCart; //qty in cart

function refreshCart(){
    let cart_number = 0
    for(let i=0; i < qtyInCart.length;i++){
        cart_number += qtyInCart[i]
    }
    //numbers of items in cart to the nav bar
    $('#in_cart_count').html(cart_number)
}
function clickAddCart(){
    $('.add_cart').on('click', function (e) {//ADD CART on button listener
        console.log(cart)
        if(itemsInCart.includes(this.id)){
            for(let i=0; i< itemsInCart.length;i++){
                if(this.id === itemsInCart[i]){
                    newQty = qtyInCart[i]
                    newQty++
                    qtyInCart[i] = newQty
                }
            }
        }
        else{
            itemsInCart.push(this.id)
            qtyInCart.push(1)
        }
        cart.setItem('inCart', JSON.stringify(itemsInCart))
        cart.setItem('qtyInCart',JSON.stringify(qtyInCart))
        refreshCart();
    });
}

//REQ TO ID

    //PRODUCT PAGE GET /:id
    let chemin = window.location.search
    let idProduct = chemin.substring(1)
    console.log(idProduct)
    let XHR = new XMLHttpRequest
    XHR.open('GET',api+ '/'+idProduct)
    XHR.send()
    XHR.onreadystatechange = function(){

        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            let product = JSON.parse(this.responseText)
            console.log(this.responseText)
            console.log(product)
            $('title').html("oribear "+product.name)
            $('#product-title').html(product.name)
            $('#product_body').append('<img class="col-sm-6 col-md-3 offset-md-1" src="'+ product.imageUrl +'" alt="image de '+ product.name + '"/>')
            $('#product_body').append('<p class="col-md-4 col-sm-8" id="product_description">'+product.description+'</p>')
            $('#product_body').append('<div class="col-md-3 col-sm-10 d-flex flex-column justify-content-between align-items-center" id="product_cart_col"></div>')
            $('#product_cart_col').append('<form id="color-select"> </form>')
            $('#color-select').append('<label for="color-select_menu" id="color-label">Couleur :</label>')
            $('#color-select').append('<select name="color-select_menu" id="color-select_menu"></select>')
            $('#color-select_menu').append('<option value="">choisissez une couleur</option>')
            for(let i=0; i < product.colors.length;i++){
                $('#color-select_menu').append('<option value="'+product.colors[i]+'">'+product.colors[i]+'</option>')
            }
            $('#product_cart_col').append('<h2>'+product.price/100+'€</h2>')
            $('#product_cart_col').append('<button type="button" class="btn add_cart mx-auto btn-success" id="'+product._id+'" id="'+product._id+'">Ajouter au panier</button>')

        }
        if (localStorage == null) {//if first time connecting to this website
            itemsInCart = []
            qtyInCart = []
            $('#card_button').html('0')
        }
        else if(localStorage.length ==0){
            itemsInCart = []
            qtyInCart = []
            $('#card_button').html('0')
        }
        else {
            itemsInCart = JSON.parse(cart.getItem('inCart'))
            qtyInCart = JSON.parse(cart.getItem('qtyInCart'))
            $('#card_button').html(itemsInCart.length)
    
        };
        $('.add_cart').on('click', function (e) {//ADD CART on button listener
            console.log(cart)
            if(itemsInCart.includes(this.id)){
                for(let i=0; i< itemsInCart.length;i++){
                    if(this.id === itemsInCart[i]){
                        newQty = qtyInCart[i]
                        newQty++
                        qtyInCart[i] = newQty
                    }
                }
            }
            else{
                itemsInCart.push(this.id)
                qtyInCart.push(1)
            }
            cart.setItem('inCart', JSON.stringify(itemsInCart))
            cart.setItem('qtyInCart',JSON.stringify(qtyInCart))
            let cart_number = 0
            for(let i=0; i < qtyInCart.length;i++){
                cart_number += qtyInCart[i]
            }
            console.log(JSON.parse(cart.getItem('inCart')))
            //numbers of items in cart to the nav bar
            $('#in_cart_count').html(cart_number)
        });
    }



    $('#in_cart').on('mouseover',function(){//Fade in Popover incart items
        $('#in_cart_popover').fadeIn('slow')
    })
    $('#in_cart').on('mouseout',function(){//Fade out Popover incart items
        $('#in_cart_popover').fadeOut('slow')
    })
    