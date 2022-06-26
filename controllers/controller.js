const db = require('../models/db.js');
const Post = require('../models/Schemas/post.js');
const User = require('../models/Schemas/user.js');

const express = require(`express`);
const app = express();

app.set('views')

const controller = {
    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function(req, res) {  
        db.findMany(Post, {}, {}, async function(result) {
            console.log("hi!")
            const posts = await result
            res.render('index', {posts});
        });
    },

    //check if acc has same username and password
    getCheckAcc: function(req, res) {
        db.findOne(User, {username: req.query.username, password:req.query.password}, function(result) {
            if (result) {
                res.send(result);
            } else {
                res.send("");
            }
        });
    },

    //check if username is taken
    getCheckUsername: function(req, res) {
        db.findOne(User, {username: req.query.username},{}, async function(result) {
            await res.send(result)
        });
    },

    //add account
    getAddAcc: function(req, res) {
        let data = {
            username: req.query.username,
            name: "",
            password: req.query.password,
            isModerator: false,
            bio: "",
            profile_pic: "",
            following: 0,
            followers: 0,
            cookies: 0
        };

        db.insertOne(User, data, (result) => {
            res.send();
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
        db.findOne(Post,  req.query.post_id, {}, async function (result) {
            const post = await result
            res.render('layouts/post', post);
        })
    },

    getProfile: function (req, res) {

        var render = {
            user: null,
            posts: null
        }

        db.findOne(User,  req.query.username, {}, async function (result) {
            render.user = await result
            
            
        })

        db.findMany(Post, req.query.username, {}, async function(result) {
            render.posts = await result
            
        })

        res.render('layouts/profile', render);
        console.log(render)
        
    },

    getSearch: function (req, res) {
        console.log('hi4');
        db.findMany(Post, {}, {}, function(result) {
            res.render('index', {posts: result, name: result, username:result});
        });
    },
}

module.exports = controller;