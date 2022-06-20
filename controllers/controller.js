const db = require('../models/db.js');
const Post = require('../models/Schemas/post.js');

const controller = {
    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function(req, res) {
        db.findMany(Post, {}, {}, function(result) {
            res.render('index');
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
}

module.exports = controller;