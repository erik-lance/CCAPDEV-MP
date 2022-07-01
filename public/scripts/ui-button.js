$(document).ready(function() {

    var hollow_upvote = '<svg class="ui-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 25">' +
    '<polygon  class="upvote" points="30 17.49 1.94 24.03 30 0.65 58.06 24.03 30 17.49"/>' +
    '<path class="upvote" d="M35,2,61.12,23.79l-25.89-6L35,17.7l-.23.06-25.89,6L35,2M35,.72l-30,25,30-7,30,7L35,.72Z" transform="translate(-5 -0.72)"/>' +
    '</svg>'

    var hollow_downvote = '<svg class="ui-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 25">' +
    '<polygon class="downvote" points="1.94 0.97 30 7.51 58.06 0.97 30 24.35 1.94 0.97"/>' +
    '<path class="downvote" d="M61.12,2.66,35,24.42,8.88,2.66l25.89,6,.23.06.23-.06,25.89-6M65,.72l-30,7L5,.72l30,25,30-25Z" transform="translate(-5 -0.72)"/>' +
    '</svg>';

    var filled_upvote = '<svg class="ui-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 25">' +
    '<polygon  class="upvote-filled" points="30 17.49 1.94 24.03 30 0.65 58.06 24.03 30 17.49"/>' +
    '<path class="upvote-filled" d="M35,2,61.12,23.79l-25.89-6L35,17.7l-.23.06-25.89,6L35,2M35,.72l-30,25,30-7,30,7L35,.72Z" transform="translate(-5 -0.72)"/>' +
    '</svg>'

    var filled_downvote = '<svg class="ui-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 25">' +
    '<polygon class="downvote-filled" points="1.94 0.97 30 7.51 58.06 0.97 30 24.35 1.94 0.97"/>' +
    '<path class="downvote-filled" d="M61.12,2.66,35,24.42,8.88,2.66l25.89,6,.23.06.23-.06,25.89-6M65,.72l-30,7L5,.72l30,25,30-25Z" transform="translate(-5 -0.72)"/>' +
    '</svg>';

    function fixAllUpvotes() {

        $('.post-wrapper').each( function ()
        {
            var upvote_btn =  $(this).find('.upvote-btn');
            var post_id = $(this).attr('id');
            $.get('/CheckVote', {post_id: post_id}, function(res) {
                if(typeof res !== 'undefined'){
                    var temp = res.upvote;
                    if(temp){
                        upvote_btn.html(filled_upvote)
                    }
                }
            })
        })
    }

    fixAllUpvotes();

    function fixAllDownvotes() {
        $('.post-wrapper').each( function ()
        {
            var downvote_btn = $(this).find('.downvote-btn');
            var post_id = $(this).attr('id');
            $.get('/CheckVote', {post_id: post_id}, function(res) {
                if(typeof res !== 'undefined'){
                    var temp = res.downvote;
                    if(temp){
                        downvote_btn.html(filled_downvote)
                    }
                }
            })
        });
    }

    fixAllDownvotes();

    $('.upvote-btn').on('click', function() {
        var post_id = $(this).parent().parent().attr('id')
        var num = $(this).parent().find('span')

        if($(this).find('.upvote').length !== 0) 
        {
            let num_val = parseInt(num.text())+1

            $(this).html(filled_upvote)
            if($('.downvote-filled')[0])
            {
                $('.downvote-btn').html(hollow_downvote);
                num_val += 1
            }

            $.get('/upvote', {post_id:post_id}, function(res) {

            })

            
            num.text(num_val)
        }
        else 
        {
            $(this).html(hollow_upvote)
            $.get('/removeVote', {is_upvote: true, post_id:post_id}, function(res) {

            })

            let num_val = parseInt(num.text())-1
            num.text(num_val)
        }
    })
    
    
    $('.downvote-btn').on('click', function() {
        var post_id = $(this).parent().parent().attr('id')
        var num = $(this).parent().find('span')

        if($(this).find('.downvote').length !== 0) 
        {
            let num_val = parseInt(num.text())-1

            $(this).html(filled_downvote)
            if($('.upvote-filled')[0])
            {
                $('.upvote-btn').html(hollow_upvote);
                num_val -= 1;
            }

            
            $.get('/downvote', {post_id:post_id}, function(res) {
            })

            
            num.text(num_val)
        }
        else 
        {
            $(this).html(hollow_downvote)
            $.get('/removeVote', {is_upvote: false, post_id:post_id}, function(res) {
            })

            let num_val = parseInt(num.text())+1
            num.text(num_val)
        }
    })


})


