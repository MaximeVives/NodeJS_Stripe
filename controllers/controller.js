const product = require('../database/data.json');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

//Return view : index
function accueil(req, res) {
    res.render('index');
}

//Return view : success
function success(req, res) {
    res.render('success');
}

//Return view : payment (liste des produits)
function shop(req, res){
    res.render('shop', {
        product: product
    });
}

//Return view : confirm-shop (page contenant le produit avec le bouton pour procéder à l'achat)
function confirmShop(req, res){
    const id = req.params.id;
    const uniqProduct = product.find(prod => prod.id === id);
    res.render('confirm-shop', {
        stripePublishableKey: keys.stripePublishableKey,
        product: uniqProduct,
    });
}

//Validation Paiement + return view : success
function payment(req, res){
    const id = req.params.id;
    const uniqProduct = product.find(prod => prod.id === id);
    const amount = uniqProduct.stripePrice;
    const name = uniqProduct.name

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount: amount,
        description: name,
        currency: 'eur',
        receipt_email: req.body.stripeEmail,
        customer: customer.id
    }))
    .then(charge => res.render('success'))
}


//Export pour route.js
module.exports = {
    accueil,
    success,
    shop,
    confirmShop,
    payment
}