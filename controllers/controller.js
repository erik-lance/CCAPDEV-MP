const bcrypt = require('bcrypt');

const db = require('../models/db.js');
const Post = require('../models/Schemas/post.js');
const User = require('../models/Schemas/user.js');
const Comment = require('../models/Schemas/comment.js');
const Image = require('../models/Schemas/files.js');
const Puzzle = require('../models/Schemas/puzzle.js');

const express = require(`express`);
const app = express();
const path = require('path');

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

    getAddPost: function(req, res) {
        let title = req.query.title;
        let body = req.query.body;
        let id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));

        var data = {
            post_id: id,
            date_posted: new Date,
            username: req.session.user,
            title: title,
            body: body,
            upvotes: 0,
            downvotes: 0
        };

        db.insertOne(Post, data, (result) => {
            res.send();
        });
    },

    getComment: function(req, res) {
        let username = req.session.user;
        let post_id = req.query.post_id;
        console.log('This is the post ID ' + post_id);
        let id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
        let text = req.query.text;
        
        var data = {
            comment_id: id,
            post_id: post_id,
            username: username,
            date_posted: new Date,
            text: text,
        };

        console.log(data)
        db.insertOne(Comment, data, (result) => {
            res.send();
        });
    },

    getReply: function(req, res) {
        console.log('hi reply')
        let user = req.session.user;
        let post = req.query.post_id;
        let cmnt = req.query.comment_id
        let id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
        let text = req.query.text;

        var data = {
            comment_id: id,
            reply_id: cmnt,
            post_id: post,
            username: user,
            date_posted: new Date,
            text: text,
        };

        console.log(data)

        db.insertOne(Comment, data, (result) => {
            console.log(result)
            res.send();
        });
    },

    getUpdatePass: function(req, res){
        var password = req.query.password;
        const saltRounds = 10;
        // Hash password
        bcrypt.hash(password, saltRounds, (err, hashed) => {
            db.updateOne(User, {username: req.session.user}, {password: hashed}, async function(result){
                if(result){
                    res.send(result)
                }
                else{
                    console.log("Error, user in settings does not exist(?)")
                }
            })
        });
    },

    getUpdateAcc: function(req, res) {

    },

    getUpdateProfile: function(req,res) {
        var n = req.query.name;
        var b = req.query.bio;

        db.updateOne(User, {username:req.session.user}, {name:n,bio:b}, async function(result) {
            if (result)
            {
                res.send(result)
            }
            else console.log("Error, user in settings does not exist(?)")
        })
    },

    postUpdateImage: function(req, res) {
        const img_file = req.files.file;
        
        img_file.mv(path.resolve(__dirname+'/..','public/images/profile-imgs',img_file.name), (error) => {
            db.updateOne(User, {username:req.session.user}, {profile_pic:img_file.name}, function(result) {
                res.send(result);
            })
        })
        
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
        db.findOne(User, {username:req.session.user},{}, async function(userRes) {
            if (req.session.user !== undefined) {
                var profile = await userRes; 
            }
            await res.render('layouts/settings', {profile});
        })

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
            comments: [],
            logged: null
        }


        function main_dets() {
            return new Promise(resolve => {
                // Finds logged user
                db.findOne(User, {username: req.session.user},{}, async function(logRes) 
                {
                    if (req.session.user !== null) full_post.logged = await logRes;    

                    // Finds the post
                    db.findOne(Post,  {post_id:req.params.post_id}, {}, async function (postRes) 
                    {
                        full_post.post = await postRes;
                        // Finds owner of post
                        db.findOne(User,  {username:full_post.post.username}, {}, async function (userRes) 
                        {
                            full_post.user = await userRes;
                            resolve();
                        })
                    })
                })
            })
        }

        main_dets().then(() => 
        {

            function getRepliesImgs(obj, replyRes) {
                return new Promise(resolve => 
                {
                    var r_iteration = replyRes.length;

                    if  (r_iteration > 0)
                    {
                        for (var reply_item of replyRes)
                        {
                            const async_r = reply_item
                            db.findOne(User, {username:async_r.username},{}, async function(imgRep) 
                            {
                                var robj = async_r.toObject();
                                if (req.session.user ===await imgRep.username) robj.logged = true
                                robj.profile_pic = await imgRep.profile_pic;
                                obj.replies.push(await robj);
                                
                                r_iteration--;

                                
                                if (r_iteration <= 0) resolve();
                            })
                            
                        }
                    }
                    else resolve();
                })
            }

            function loadCommentReps(comRes) 
            {
                return new Promise(resolve =>     
                {
                    var e_iterations = comRes.length;

                    if (e_iterations > 0)
                    {
                        for (var e of comRes)
                        {
                            const async_e = e;

                            db.findOne(User, {username:async_e.username},{}, async function(imgRes) 
                            {
                                var obj = async_e.toObject();
                                if (req.session.user === await imgRes.username) obj.logged = true
                                obj.profile_pic = await imgRes.profile_pic;
            
                                obj.replies = []
            
                                // Finds each reply
            
                                db.findMany(Comment, {reply_id: async_e.comment_id}, {}, async function(replyRes) 
                                {
                                    // subtrats iterations after finishing
                                    getRepliesImgs(obj, await replyRes).then(() => 
                                    {
                                        e_iterations--;
                                        full_post.comments.push(obj)
                                        if (e_iterations <=0) resolve();
        
                                    })
                                })
                            });
                        }
                    }
                    else {resolve();}
                    
                })
            }

            
            // Finds all comments under post
            db.findMany(Comment, {post_id:req.params.post_id, reply_id:{$exists:false}}, {}, async function(comRes) 
            {
                loadCommentReps(await comRes).then(() => 
                {
                    res.render('layouts/post', {full_post})
                });
            })
        });


    },

    getProfile: function (req, res) {

        var render = {
            user: null,
            posts: null
        }

        db.findOne(User,  {username:req.params.username}, {}, async function (result) {
            render.user = await result
            db.findMany(Post, {username:req.params.username}, {}, async function(result) {
                render.posts = await result
                await res.render('layouts/profile', {render});
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
                if(render.first.length != 0 && render.second.length != 0){
                    for(let i=0; i<render.first.length; i++){
                        for(let j=0; j<render.second.length; j++){
                            console.log(render.first[i]);
                            console.log(render.second[j])
                            if(render.first[i].post_id == render.second[j].post_id){
                                delete render.second[j];
                                j--;
                                render.second.length--;
                            }
                        }
                    }
                }
                await res.render('layouts/search', {render});
            })
        })
    },

    makePuzzle: function(req,res){
        let question = req.query.question;
        let answer = req.query.answer;
        let id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));

        db.findMany(Post,  {username:req.session.user}, {}, async function (result) {
            let posts = await result;
            let nPost = posts.length - 1;
            let post_id = posts[nPost].post_id

            var data = {
                puzzle_id: id,
                post_id: post_id,
                question: question,
                password: answer
            };

            db.insertOne(Puzzle, data, (result) => {
                res.send();
            });
        })        
    }
}

module.exports = controller;