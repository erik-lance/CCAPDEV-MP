const express = require(`express`);
const hbs = require(`hbs`);
const bodyParser = require(`body-parser`);
const routes = require(`./routes/routes.js`);
const db = require(`./models/db.js`);
const session = require('express-session');
const flash = require('connect-flash');

// For File Uploads
const fileUpload = require('express-fileupload');
const path = require('path');


const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

//const MongoStore = require('connect-mongo')(session);
const MongoStore = require('connect-mongo');


const fileupload = require('express-fileupload');

const app = express();
app.use(express.json()); // Uses JSON through parsing
app.use(bodyParser.urlencoded({ extended: true })); // Set to true because we're not only using string as information

app.set(`view engine`, `hbs`);
hbs.registerPartials(__dirname + `/views/partials`);

// Handlebars Helpers

hbs.registerHelper('points', function(object) {
    return object.upvotes - object.downvotes
})

hbs.registerHelper('time', function(object) {
    
})

app.use(express.static(`public`));

// Sessions
app.use(session({
    secret: 'somegibberishsecret',
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/CCAPDEV_MP' }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 }
  }));

app.use(fileUpload()); // for fileuploading

app.use(`/`, routes);




db.connect();

app.listen(3000, function () {
    console.log(`Server is running at: 3000`);
});
