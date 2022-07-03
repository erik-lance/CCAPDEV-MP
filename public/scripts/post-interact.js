function openForm() {
    document.getElementById("myForm").style.visibility = "visible";
}
  
function closeForm() {
    window.location.href = window.location.pathname;
}

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
        var upvote_btn =  $('.upvote-btn');
        var post_id = window.location.pathname.split("/").pop();

        $.get('/CheckVote', {post_id: post_id}, function(res) {
            if(typeof res !== 'undefined'){
                var temp = res.upvote;
                if(temp){
                    upvote_btn.html(filled_upvote)
                }
            }
            else{
                upvote_btn.html(hollow_upvote)
            }
        })
    }

    fixAllUpvotes();

    function fixAllDownvotes() {

        var downvote_btn =  $('.downvote-btn');
        var post_id = window.location.pathname.split("/").pop();

        $.get('/CheckVote', {post_id: post_id}, function(res) {
            if(typeof res !== 'undefined'){
                var temp = res.downvote;
                if(temp){
                    downvote_btn.html(filled_downvote)
                }
            }
            else{
                downvote_btn.html(hollow_downvote);
            }
        })
    }

    fixAllDownvotes();

    $('img').on('error', (event) => {
        event.target.src = "/images/profile-imgs/default-profile-pic.png"
        event.onerror = null
    })

    
    var isPuzzleSolved = false;
    $('.comment-btn').on('click',function() {
        if ($('#main-feed').length > 0)
        {
            let page_id = $(this).parent().parent().parent().attr('id')
            window.location.href = "/p/"+page_id;
        }
        else
        {
            var post_id = window.location.pathname.split("/").pop();

            var data = {
                post_id: post_id
            }
    
            $.get('/checkPuzzle', data, function(result){
                if(!isPuzzleSolved && result != ''){
                    openForm();
                    $('#editor').prop('disabled', true);
                    $('#text-submit').prop('disabled', true);
                    $('#message').text(result.question);
                    isPuzzleSolved = true
                }
                else
                {
                    var editor = $('#editor')[0]
                    editor.scrollIntoView();
                    $('#editor').trigger('focus')
                }
            });


        }
    })

    $('.comment-segment').on('click', function(e) 
    {
        if ($(e.target).is('div'))
        {
            if ($(this).find('div:hidden').length > 0) {
                $(this).find('.comment-text').show();
                $(this).find('.reply').show();
            }
            else {
                $(this).find('.comment-text').hide();
                $(this).find('.reply').hide();
            }
        }
        
    })

    // Reply index
    var index = null;

    // Sets comment replying to
    $('.reply-btn').on('click', function() {
        $('#reply-line').css('visibility', 'visible');

        // Grabs comment_id
        index = $(this).parent().parent().parent().parent().attr('id');
        var uname = $(this).parent().parent().parent().find('.comment-text a span').text();

        $('#editor-reply-author').text(uname)

    })

    $('#del-btn').on('click', function() {
        $(this).parent().css('visibility', 'hidden');
        index = null;
    })
    
    // Submits comments
    $('#text-submit').on('click', function() {
        var text = $('#editor').val()
        var post_id = window.location.pathname.split("/").pop();
        //Check with Erik
        if(!text){
            $('#editor').css('border','1px solid red')
        }
        if(text){
            $('#editor').css('border','1px solid white')

            if (!index)
            {
                $.get('/Comment', 
                    {
                        text: text,
                        post_id: post_id
                    }, function() {
                        window.location.href = "/p/"+post_id
                })
            }
            else
            {
                $.get('/Reply',
                    {
                        text: text,
                        post_id: post_id,
                        comment_id: index
                    }, function(res) {
                        window.location.href = "/p/"+post_id
                    }
                )
            }
        }
    })

    $('.kebab-edit-btn').on('click', function() {
        var kebab_class = $(this).parent().parent().parent().parent();
        var post_id = window.location.pathname.split("/").pop();

        var link = '/e/'+post_id
        // Adds post_id since it's usually the last one.

        if (kebab_class.parent().hasClass("com-btns"))
        {
            // Just paste the comment_id.
            var com_segment = kebab_class.parent().parent().parent();
            link = link+'/'+com_segment.attr('id');
            window.location.href = link;
        }
        else if (kebab_class.parent().hasClass("reply"))
        {
            // Replies don't have com-btns. They're directly under the parent class. 
            var com_segment = kebab_class.parent()
            link = link+'/'+com_segment.attr('id');
            window.location.href = link
        }
        else
        {
            // All we need is post id.
            window.location.href = link;
        }
    })

    $('.kebab-delete-btn').on('click', function() {
        var kebab_class = $(this).parent().parent().parent().parent();

        // Adds post_id since it's usually the last one.

        if (kebab_class.parent().hasClass("com-btns"))
        {
            var com_segment = kebab_class.parent().parent().parent().attr('id');
            $.get('/deleteComment', {comment_id: com_segment}, function(result){
                window.location.reload()
            })
        }
        else if (kebab_class.parent().hasClass("reply"))
        {
            // Replies don't have com-btns. They're directly under the parent class. 
            var com_segment = kebab_class.parent().attr('id');
            $.get('/deleteReply', {comment_id: com_segment}, function(result){
                window.location.reload()
            })
        }
        else
        {
            var post_id = window.location.pathname.split("/").pop();
            $.get('/deletePost', {post_id: post_id}, function(result){
                window.location.href = '/';
            })
            
            // All we need is post id.
            //window.location.href = link;
        }
    })

    $('#editor').one('click', function() {
        var post_id = window.location.pathname.split("/").pop();

        var data = {
            post_id: post_id
        }

        $.get('/checkPuzzle', data, function(result){
            if(!isPuzzleSolved && result != ''){
                openForm();
                $('#editor').prop('disabled', true);
                $('#text-submit').prop('disabled', true);
                $('#message').text(result.question);
                isPuzzleSolved = true
            }
        });
    });

    $('#submit-answer').click(function() {
        let answer = document.querySelector('#answer').value;
        let post_id = window.location.pathname.split("/").pop();

        let values = {
            post_id: post_id,
            answer: answer
        }
        
        $.get('/answerPuzzle', values, function(result){
            if(result == 'correct'){
                $('#editor').prop('disabled', false);
                $('#text-submit').prop('disabled', false);
                $('#error-message').text('');
                document.getElementById("myForm").style.visibility = "hidden";
                $('#editor').trigger('focus')
            }
            else{
                $('#text-submit').prop('disabled', true);
                $('#error-message').text('incorrect answer');
            }
        });
    });

})