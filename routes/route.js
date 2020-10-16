const routes = require('express').Router();
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)

//Index Route
routes.get('/', (req, res) => {
    res.render('index')
})

routes.get('/success', (req, res) => {
    res.render('success');
})

//Shop route
routes.get('/payment', (req, res) => {
    res.render('payment', {
        stripePublishableKey: keys.stripePublishableKey
    });
})

//Charge (payment) Route
routes.post('/charge', (req, res) => {
    const amount = 2500;

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
        .then(customer => stripe.charges.create({
            amount: amount,
            description: 'Laravel Guide Ebook',
            currency: 'eur',
            customer: customer.id
        }))
        .then(charge => res.render('success'))
});


module.exports = routes;