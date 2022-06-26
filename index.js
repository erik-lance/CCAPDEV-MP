const express = require(`express`);
const hbs = require(`hbs`);
const bodyParser = require(`body-parser`);
const routes = require(`./routes/routes.js`);
const db = require(`./models/db.js`);
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);

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

db.connect();

app.listen(3000, function () {
    console.log(`Server is running at: 3000`);
});
