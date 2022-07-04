const express = require(`express`);
const hbs = require(`hbs`);
const bodyParser = require(`body-parser`);
const routes = require(`./routes/routes.js`);
const db = require(`./models/db.js`);
const session = require('express-session');
const flash = require('connect-flash');
const moment = require('moment');

const config = require('dotenv').config()
const sessionKey = config.parsed.SESSION_SECRET
const url = config.parsed.MONGODB_URL;
const port = process.env.PORT || 3000;

// For File Uploads
const fileUpload = require('express-fileupload');
const path = require('path');


const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

//const MongoStore = require('connect-mongo')(session);
const MongoStore = require('connect-mongo');


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
    var Seconds = moment().diff(object.date_posted, "seconds");
    var Minutes = moment().diff(object.date_posted, "minutes");
    var Hours = moment().diff(object.date_posted, "hours");
    var Days = moment().diff(object.date_posted, "days");
    var Months = moment().diff(object.date_posted, "months");
    var Years = moment().diff(object.date_posted, "years");

    if(Seconds < 60) return Seconds + " seconds";
    else if(Minutes < 60) return Minutes + " minutes";
    else if(Hours < 24) return Hours + " hours";
    else if(Days < 30) return Days + " days";
    else if(Months < 12) return Months + " months";
    else return Years + " years";
})




app.use(express.static(`public`));

db.connect(url);

// Sessions
app.use(session({
    secret: sessionKey,
    store: MongoStore.create({ mongoUrl: url }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 }
  }));

app.use(fileUpload()); // for fileuploading

app.use(`/`, routes);






app.listen(port, '0.0.0.0', function () {
    console.log(`Server is running at: `+port);
});
