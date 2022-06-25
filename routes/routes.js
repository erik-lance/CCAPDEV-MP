const express = require(`express`);
const controller = require(`../controllers/controller.js`);

const app = express();

app.get(`/favicon.ico`, controller.getFavicon);
app.get(`/`, controller.getIndex);
app.get(`/delete`, controller.getDelete);

app.get('/s/user_sign', controller.getUserSign);
app.get('/s/user_reg', controller.getUserReg);
app.get('/p/post_editor', controller.getPostEditor);
app.get('/p/:post_d', controller.getPost);
app.get('/u/:username', controller.getProfile);

app.get(`/addAcc`, controller.getAddAcc);
app.get('/getCheckUsername', controller.getCheckUsername);
app.get('/getCheckAcc', controller.getCheckAcc);

module.exports = app;