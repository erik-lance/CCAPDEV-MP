const bcrypt = require('bcrypt');

const db = require('../models/db.js');
const Post = require('../models/Schemas/post.js');
const User = require('../models/Schemas/user.js');
const Comment = require('../models/Schemas/comment.js');

const express = require(`express`);
const app = express();

app.set('views')

const controller = {
    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function(req, res) {  
        console.log(req.session)

        var indexPage = {
            posts: null,
            user: null
        }


        db.findMany(Post, {}, {}, async function(result) {
            indexPage.posts = await result
            console.log(req.session.user)
            db.findOne(User, {username:req.session.user},{}, async function(userRes) {
                if (req.session.user !== undefined) {
                    indexPage.user = await userRes; 
                }
                await res.render('index', {indexPage});
            })
        });
    },

    //check if acc has same username and password
    getCheckAcc: function(req, res) {
        db.findOne(User, {username: req.query.username, password:req.query.password}, async function(result) {
            await res.send(result)
        });
    },

    getLogin: function(req, res){
        var password = req.query.password;
        console.log(password);
        db.findOne(User, {username: req.query.username}, {}, (user) => {
            if(user){
                console.log(user.password)
                bcrypt.compare(password, user.password, (err, result) => {
                    if(result){
                        //Not sure about this
                        req.session.user = user.username;
        
                        console.log(req.session)

                        res.send(result);
                    }
                    else {
                        res.send("");
                    }
                });
            }
        })
    },

    getLogout: function(req, res){
        if (req.session) {
            req.session.destroy(() => {
              res.clearCookie('connect.sid');
              res.redirect('/Login');
            });
          }
    },

    //check if username is taken
    getCheckUsername: function(req, res) {
        db.findOne(User, {username: req.query.username},{}, async function(result) {
            await res.send(result)
        });
    },

    //add account
    getAddAcc: function(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        let data = {
            username: req.query.username,
            password: '',
            isModerator: false,
            bio: '',
            profile_pic: '',
            following: 0,
            followers: 0,
            cookies: 0
        }

        const saltRounds = 10;
        // Hash password
        bcrypt.hash(password, saltRounds, (err, hashed) => {
            data.password = hashed
            db.insertOne(User, data, (err, user) => {
                res.send();
            });
        });
    },

    //add post
    getAdd: function(req, res) {
        let posts = {
            post_id: req.query.post_id,
            date_posted: req.query.date_posted,
            username: req.query.username,
            title: req.query.title,
            body: req.query.body,
            upvotes: req.query.upvotes,
            downvotes: req.query.downvotes,
            puzzle_id: req.query.puzzle_id
        };

        db.insertOne(Post, posts, (result) => {
            res.send();
        });
    },

    getUpdateAcc: function(req, res) {

    },

    getUpdateProfile: function(req,res) {

    },

    getDelete: function (req, res) {
        db.deleteOne(Post, {post_id: req.query.post_id}, function(result) {
            res.redirect('/');
        });
    },

    getUserSign: function (req, res) {
        console.log('hi');
        res.render('layouts/user_sign');
        // window.location.href = "http://localhost:3000/s/user_sign";
    },

    getUserReg: function (req, res) {
        console.log('hi1');
        res.render('layouts/user_reg');
    },

    getSettings: function (req, res) {
        res.render('layouts/settings');
    },

    getHome: function (req, res) {
        console.log('hi2');
        db.findMany(Post, {}, {}, function(result) {
            res.render('index', {posts: result, name: result, username:result});
        });
    },

    getPostEditor: function (req, res) {
        console.log('hi3');
        res.render('layouts/post_editor');
    },

    getPost: function (req, res) {
        var full_post = {
            user: null,
            post: null,
            comments: null
        }
        
        // Finds the post
        db.findOne(Post,  req.query.post_id, {}, async function (postRes) {
            full_post.post = await postRes;
            
            // Finds owner of post
            db.findOne(User,  req.query.username, {}, async function (userRes) {
                full_post.user = await userRes;

                // Finds all comments under post
                db.findMany(Comment, req.query.post_id, {}, async function(comRes) {

                    full_post.comments = await comRes;

                    res.render('layouts/post', full_post);
                })
            })
        })
    },

    getProfile: function (req, res) {

        var render = {
            user: null,
            posts: null
        }

        db.findOne(User,  req.query.username, {}, async function (result) {
            render.user = await result
            db.findMany(Post, req.query.username, {}, async function(result) {
                render.posts = await result
                await res.render('layouts/profile', render);
                console.log(render)
            })
        })
    },

    getSearch: function (req, res) {
        var search = req.params.word;
        var render = {
            first: null,
            second: null
        }
        
        db.findMany(Post, {title: {$regex:search, $options : 'i'}}, {}, async function(result1) {
            render.first = await result1;
            db.findMany(Post, {body: {$regex:search, $options : 'i'}}, {}, async function(result2) {
                render.second = await result2;
                await res.render('layouts/search', {render});
                console.log(render);
            })
        })
        
    },
}

module.exports = controller;