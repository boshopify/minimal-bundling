// addToCartScript.js

window.addEventListener('DOMContentLoaded', (e)=> {
    init()
})

/* initialize */
const init = () => {
    console.log('DOM fully loaded and parsed.')
    // disable add to cart button before users make any selection choice
    enableAddToCart(false)
    /* listen to the change event on all selects */
    document.querySelectorAll('.bundle-select').forEach( elem => {
        elem.addEventListener('change', selectCallback)
    })
    /* attach form submit callback */
    document.querySelector('.product-single form').addEventListener('submit', addToCartCallback)
}

/* enable add to cart button if enable=true; otherwise, disable the button */
const enableAddToCart = (enable) => {
    const btnAddToCart = document.getElementById('AddToCart')     
    btnAddToCart.disabled = !enable
}

/* the callback function to handle select event */
const selectCallback = () => {
    let allSelected = true
    document.querySelectorAll('.bundle-select').forEach( elem => {
        // check whether any select has not been made by user - value is empty
        if(!elem.value) allSelected = false
    })
    // enable add to cart button when allSelected is true; otherwise, disable the button again
    enableAddToCart(allSelected)
}

/* add to cart callback */
const addToCartCallback = (e) => {
    e.preventDefault()
    
    let data = {
        items: []
    }
    // push the bundle product variant ID for add to cart ajax API request
    data.items.push({
        id: document.querySelector('.product-single__variants').value
    })
    // push the bundle items' variant IDs selected by user for add to cart ajax API request
    document.querySelectorAll('.bundle-select').forEach( elem => {
        data.items.push({
            id: elem.value
        })
    } )
    // use AJAX API to add multiple variants into cart
    fetch('/cart/add.js',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then( res => res.json())
    .then( json => {
        // redirect user to cart
        window.location.href='/cart'
    })
    .catch( error => {
        console.log('Error: ', error)
    } )
}
