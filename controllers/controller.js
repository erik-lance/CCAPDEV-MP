const bcrypt = require('bcrypt');

const db = require('../models/db.js');
const Post = require('../models/Schemas/post.js');
const User = require('../models/Schemas/user.js');
const Comment = require('../models/Schemas/comment.js');
const Image = require('../models/Schemas/files.js');
const Puzzle = require('../models/Schemas/puzzle.js');
const Vote = require('../models/Schemas/vote.js');

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

    getCheckVote: function(req, res) {
        var post_id = req.query.post_id;
        var username = req.session.user;
        
        db.findOne(Vote, {post_id: post_id, username: username}, {}, async function(result){
            console.log(await result);
            res.send(await result);
        })
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

    getSessionUser: function(req, res) {
        if (typeof req.session.user !== 'undefined')
        {
            db.findOne(User, {username: req.session.user}, {}, async function(result) {
                res.send(await result.username);
            })
        }
        else
        {
            res.send(null)
        }
        
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
            profile_pic: 'default-profile-pic.png',
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

    getUpdatePost: function(req, res){
        var text = req.query.text;
        var post_id = req.query.post_id;

        db.updateOne(Post, {post_id: post_id}, {body: text}, async function(result){
            if(result){
                res.send(result)
            }
            else{
                console.log("Error, post does not exist")
            }
        })
    },


    getUpdateComment: function(req, res){
        console.log('test');
        var text = req.query.text;
        var post_id = req.query.post_id;
        var comment_id = req.query.comment_id;

        db.updateOne(Comment, {post_id: post_id, comment_id: comment_id}, {text: text}, async function(result){
            if(result){
                res.send(result)
            }
            else{
                console.log('Error, comment does not exist')
            }
        })
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

    getEditPost: function(req, res) {
        var edit_obj = {
            title: '',
            author: '',
            body: '',
            profile_pic: null,
            logged: false,
            is_post: true
        }

        db.findOne(Post, {post_id:req.params.post_id}, {}, async function(postRes) {
            edit_obj.title = await postRes.title;
            edit_obj.body = await postRes.body;
            edit_obj.author = await postRes.username;

            if (req.session.user === await postRes.username) 
            {
                edit_obj.logged = true;

                db.findOne(User, {username: req.session.user}, {}, async function(imgRes) {
                    edit_obj.profile_pic = await imgRes.profile_pic
                    await res.render('layouts/edit', {edit_obj});
                })

            }
            else await res.render('layouts/edit', {edit_obj});
        })
    },

    getEditComment: function(req,res) {
        var edit_obj = {
            title: '',
            author: '',
            author_reply: '',
            reply: '',
            body: '',
            profile_pic: null,
            logged: false,
            is_post: false
        }

        db.findOne(Post, {post_id:req.params.post_id}, {}, async function(postRes) {
            edit_obj.title = await postRes.title;
            edit_obj.body = await postRes.body;
            edit_obj.author = await postRes.username;

            

            db.findOne(Comment, {comment_id:req.params.comment_id}, {}, async function(comRes) {
                if (req.session.user === await comRes.username) 
                {
                    edit_obj.logged = true;

                    db.findOne(User, {username:req.session.user}, {}, async function(imgRes) 
                    {
                        edit_obj.profile_pic = await imgRes.profile_pic;

                        if (await typeof comRes.reply_id !== 'undefined')
                        {
                            console.log(await comRes.reply_id)
                            db.findOne(Comment, {comment_id: await comRes.reply_id}, {}, async function(repRes) {
                                edit_obj.reply = await repRes.text;
                                edit_obj.body = await comRes.text;
                                edit_obj.author_reply = await comRes.username;

                                await res.render('layouts/edit', {edit_obj});
                            })
                        }
                        else{
                            edit_obj.body = await comRes.text;
                            await res.render('layouts/edit', {edit_obj});
                        }
                    })

                    
                }
                else await res.render('layouts/edit', {edit_obj});

                
            })
        })
    },

    getDeleteComment: function (req, res){
        comment_id = req.query.comment_id;
        db.deleteOne(Comment, {comment_id: comment_id}, function(comresult){
            if(comresult){
                db.deleteMany(Comment, {reply_id: comment_id}, function(represult){
                    res.redirect('/');
                })
            }
        })
    },

    getDeleteReply: function(req, res){
        console.log('test');
        comment_id = req.query.comment_id;
        db.deleteOne(Comment, {comment_id: comment_id}, function(result){
            res.send(result)
        })
    },

    getDeletePost: function(req, res){
        post_id = req.query.post_id;
        db.deleteOne(Post, {post_id: post_id}, function (posresult){
            db.deleteMany(Comment, {post_id: post_id}, function(comresult){
                if(comresult){
                    res.redirect('/');
                }
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
                        if (req.session.user === await postRes.username)full_post.post.logged = true;
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
                                if (req.session.user === await imgRep.username) robj.logged = true
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

    getUpvote: function (req,res) {
        var post_id = req.query.post_id;

        if (typeof req.session.user !== 'undefined')
        {
            db.findOne(Vote, {username:req.session.user, post_id:post_id}, {}, async function (voteRes)
            {   
                // Finds if this vote exists in the first place.
                if (await voteRes)
                {
                    let updateData = {
                        $inc: {upvotes: 1, downvotes: -1}
                    }
                    db.updateOne(Post, {post_id:post_id}, updateData, async function(updateRes)
                    {
                        db.updateOne(Vote, {username:req.session.user, post_id:post_id}, {upvote:true, downvote:false}, async function(updateVote)
                        {
                            res.send(await updateVote)
                        })
                    })   
                }
                else
                {
                    let id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
                    db.insertOne(Vote, {vote_id: id, username:req.session.user, post_id:post_id, upvote:true, downvote: false}, async function(newVote) 
                    {
                        db.updateOne(Post, {post_id:post_id}, {$inc:{upvotes:1}}, async function(finalRes)
                        {
                            res.send(await finalRes);
                        })
                    })
                } 
            })
        }
        else 
        {
            // Dude's not logged in
            res.send(null);
        }
    },

    getDownvote: function (req,res) {
        var post_id = req.query.post_id;

        if (typeof req.session.user !== 'undefined')
        {
            db.findOne(Vote, {username:req.session.user, post_id:post_id}, {}, async function (voteRes)
            {   
                // Finds if this vote exists in the first place.
                if (await voteRes)
                {
                    let updateData = {
                        $inc: {upvotes: -1, downvotes: 1}
                    }
                    db.updateOne(Post, {post_id:post_id}, updateData, async function(updateRes)
                    {
                        db.updateOne(Vote, {username:req.session.user, post_id:post_id}, {upvote:false, downvote:true}, async function(updateVote)
                        {
                            res.send(await updateVote)
                        })
                    })   
                }
                else
                {
                    let id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
                    db.insertOne(Vote, {vote_id: id, username:req.session.user, post_id:post_id, upvote:false, downvote: true}, async function(newVote) 
                    {
                        db.updateOne(Post, {post_id:post_id}, {$inc:{downvotes:1}}, async function(finalRes)
                        {
                            res.send(await finalRes);
                        })
                    })
                } 
            })
        }
        else 
        {
            // Dude's not logged in
            res.send(null);
        }
    },

    getRemoveVote: function (req,res) 
    {
        var is_upvote = req.query.is_upvote;
        var post_id = req.query.post_id;

        if (typeof req.session.user !== 'undefined') 
        {
            db.findOne(Vote, {username:req.session.user, post_id:post_id}, {}, async function (voteRes)
            {   
                let data = null
                // Finds vote to delete
                if (is_upvote === 'true')
                {
                      data = {$inc: {upvotes:-1}}
                }
                else
                {
                    data = {$inc: {downvotes:-1}}
                }
                
                console.log(is_upvote);
                console.log(data);

                db.updateOne(Post, {post_id: post_id}, data, async function(postRes)
                {
                    console.log(await postRes)
                    db.deleteOne(Vote, {username:req.session.user, post_id:post_id}, async function(finalRes) 
                    {
                        res.send(await finalRes)
                    })
                }) 
            })
        }
        else 
        {
            // Dude's not logged in
            res.send(null);
        }

    },

    getProfile: function (req, res) {

        var render = {
            user: null,
            posts: null,
            off_comments: null
        }

        function addComments(posts, list, u) 
        {
            return new Promise(resolve =>  
            {
                var p_iteration = posts.length;

                if (p_iteration > 0)
                {
                    
                    for (var post of posts)
                    {
                        const obj = post.toObject();
                        obj.comments = [];

                        db.findMany(Comment, {post_id:obj.post_id,username:u}, {}, async function(comRes)
                        {
                            obj.comments = await comRes;
                            list.push(await obj)
                            
                            p_iteration--;
                            if (p_iteration <= 0) resolve();
                        })
                    }
                }
                else resolve();
                
            })
        }

        function addOffComments(posts, list, u)
        {
            // find comments where post's user is not himself
            return new Promise(resolve => 
            {
                var a_post_id = []
                for (post of posts)
                {
                    a_post_id.push(post.post_id)
                }

                // Grabs comments outside of said posts
                db.findMany(Comment, {post_id:{$nin:a_post_id},username:u}, {}, async function(comRes)
                {
                    var c_iterations = await comRes.length;

                    if (c_iterations > 0)
                    {
                        for (var com of comRes)
                        {
                            const async_c = com;
                            list.push(com);

                            c_iterations--;
                            if (c_iterations <= 0) resolve();
                        }
                    }
                    else {resolve()}
                    
                    
                })
            })
        }

        db.findOne(User,  {username:req.params.username}, {}, async function (result) {
            render.user = await result
            db.findMany(Post, {username:req.params.username}, {}, async function(postRes) {
                var list_posts = [];
                var list_comments = [];

                

                addComments(await postRes, list_posts, req.params.username).then(() =>
                {
                    
                    render.posts = list_posts
                    addOffComments(postRes, list_comments, req.params.username).then(() =>
                    {
                        render.off_comments = list_comments;
                        
                        res.render('layouts/profile', {render});
                    })
                })

                
                
            })
        })
    },

    getSearch: function (req, res) {
        var search = req.params.word;
        var render = {
            first: null,
            second: null,
            user: null
        }
        
        db.findMany(Post, {title: {$regex:search, $options : 'i'}}, {}, async function(result1) {
            render.first = await result1;
            db.findMany(Post, {body: {$regex:search, $options : 'i'}}, {}, async function(result2) {
                db.findOne(User, {username:req.session.user}, {}, async function(userRes) 
                {
                    if (req.session.user !== undefined) render.user = await  userRes;

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
    },

    checkPuzzle: function(req,res){
        let post_id = req.query.post_id;
        let user = req.session.user;
        
        //check if post has puzzle
        db.findOne(Puzzle, {post_id:post_id}, {}, async function (result){
            let puzzle = await result;
            //check if author of post is not the current user

            if (await puzzle !== null)
            {
                db.findOne(Post,  {post_id: await puzzle.post_id}, {}, async function (result){
                    let author = await result;
                    //check if current user has not answered the puzzle by commenting on that post before
                    db.findOne(Comment,  {post_id:puzzle.post_id, username:user}, {}, async function (result){
                        let past = await result; 
                        if(puzzle != null && author.username != user && past == null){
                            console.log(past)
                            res.send(puzzle);
                        }
                        else{
                            res.send('');
                        }
                    })
                    
                })
            }
            else res.send('')
        })
    },

    answerPuzzle: function(req,res){
        let answer = req.query.answer;
        let post_id = req.query.post_id;
        
        db.findOne(Puzzle, {post_id:post_id}, {}, async function (result){
            let puzzle = await result;
            if(puzzle.password.toLowerCase() == answer.toLowerCase()){
                res.send('correct')
            }
            else{
                res.send('false')
            }
        })
    }

}



module.exports = controller;