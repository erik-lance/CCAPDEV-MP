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
app.get('/addPost', controller.getAddPost);
app.get('/Comment', controller.getComment);
app.get('/Reply', controller.getReply);

app.get('/e/:post_id', controller.getEditPost);
app.get('/e/:post_id/:comment_id', controller.getEditComment);

app.get('/Login', controller.getLogin);
app.get('/Logout', controller.getLogout);
app.get('/addAcc', controller.getAddAcc);
app.get('/UpdatePass', controller.getUpdatePass)
app.get('/updateProfile',controller.getUpdateProfile);
app.get('/UpdatePost', controller.getUpdatePost);
app.get('/UpdateComment', controller.getUpdateComment);

app.post('/updateImage', controller.postUpdateImage);

app.get('/getCheckUsername', controller.getCheckUsername);
app.get('/getCheckAcc', controller.getCheckAcc);
app.get('/getSessionUser', controller.getSessionUser);
app.get('/search/:word', controller.getSearch);

app.get('/makePuzzle', controller.makePuzzle);
app.get('/checkPuzzle', controller.checkPuzzle);
app.get('/answerPuzzle', controller.answerPuzzle);

module.exports = app;