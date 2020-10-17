const routes = require('express').Router();
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const product = require('../database/data.json');


//Index Route
routes.get('/', (req, res) => {
    res.render('index')
})

routes.get('/success', (req, res) => {
    res.render('success');
})

//Shop route
routes.get('/shop', (req, res) => {
    res.render('payment', {
        product: product
    });
})

routes.get('/confirm-shop/:id', (req, res) => {
    const id = req.params.id;
    const uniqProduct = product.find(prod => prod.id === id);
    res.render('confirm-shop', {
        stripePublishableKey: keys.stripePublishableKey,
        product: uniqProduct,
    });
})


//Charge (payment) Route
routes.post('/charge/:id', (req, res) => {
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
});


module.exports = routes;