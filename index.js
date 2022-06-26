const express = require(`express`);
const hbs = require(`hbs`);
const bodyParser = require(`body-parser`);
const routes = require(`./routes/routes.js`);
const db = require(`./models/db.js`);
const session = require('express-session');
const flash = require('connect-flash');

//const MongoStore = require('connect-mongo')(session);
const MongoStore = require('connect-mongo');


const fileupload = require('express-fileupload');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.set(`view engine`, `hbs`);
hbs.registerPartials(__dirname + `/views/partials`);

// Handlebars Helpers

hbs.registerHelper('points', function(object) {
    return object.upvotes - object.downvotes
})

hbs.registerHelper('time', function(object) {
    
})

app.use(express.static(`public`));
app.use(`/`, routes);

// Sessions
app.use(session({
    secret: 'somegibberishsecret',
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/CCAPDEV_MP' }),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }
  }));


db.connect();

app.listen(3000, function () {
    console.log(`Server is running at: 3000`);
});
