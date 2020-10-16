const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')

const routes = require('./routes/route')

const app = express();


//HandleBars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set Static Folder
app.use(express.static(`${__dirname}/public`));


//Route
app.use('/', routes);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})