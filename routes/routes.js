const express = require(`express`);
const controller = require(`../controllers/controller.js`);

const app = express();

app.get(`/favicon.ico`, controller.getFavicon);
app.get(`/`, controller.getIndex);
app.get(`/delete`, controller.getDelete);

app.get('/s/user_sign', controller.getUserSign);
app.get('/s/user_reg', controller.getUserReg);
app.get('/s/settings', controller.getSettings);

app.get('/p/post_editor', controller.getPostEditor);
app.get('/p/:post_id', controller.getPost);
app.get('/u/:username', controller.getProfile);

app.get('/Login', controller.getLogin);
app.get('/Logout', controller.getLogout);
app.get('/addAcc', controller.getAddAcc);
app.get('/updateAcc', controller.getUpdateAcc);
app.get('/updateProfile',controller.getUpdateProfile);
app.get('/getCheckUsername', controller.getCheckUsername);
app.get('/getCheckAcc', controller.getCheckAcc);
app.get('/search/:word', controller.getSearch);

module.exports = app;