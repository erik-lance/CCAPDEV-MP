const express = require(`express`);
const controller = require(`../controllers/controller.js`);

const app = express();

app.get(`/favicon.ico`, controller.getFavicon);
app.get(`/`, controller.getIndex);
app.get(`/delete`, controller.getDelete);

app.get('/user_sign', controller.getUserSign);
app.get('/user_reg', controller.getUserReg);
app.get('/post-editor', controller.getPostEditor);
app.get('/post', controller.getPost);
app.get('/profile', controller.getProfile);

app.get(`/addAcc`, controller.getAddAcc);
app.get('/getCheckUsername', controller.getCheckUsername);
app.get('/getCheckAcc', controller.getCheckAcc);

module.exports = app;