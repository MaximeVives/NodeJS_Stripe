const routes = require('express').Router();
const controller = require('../controllers/controller.js');


//Index Route
routes.get('/', controller.accueil);

//Command Valid
routes.get('/success', controller.success);

//Shop route
routes.get('/shop', controller.shop);

//Product Route
routes.get('/confirm-shop/:id', controller.confirmShop)

//Charge (payment) Route
routes.post('/charge/:id', controller.payment);

//Exportation des routes pour app.js
module.exports = routes;