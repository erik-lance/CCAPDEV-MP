function openForm() {
    document.getElementById("myForm").style.display = "block";
}
  
function closeForm() {
    window.location.href = window.location.pathname;
}

$(document).ready(function() {



    $('#comment-btn').on('click',function() {
        $('html, body').animate(
            {
              scrollTop: $(this).offset().top,
            },
            500,
            'linear'
        )
    })

    $('#share-btn').on('click', function() {



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
            console.log('Comment =' + com_segment)
            $.get('/deleteComment', {comment_id: com_segment}, function(result){
                window.location.reload()
            })
        }
        else if (kebab_class.parent().hasClass("reply"))
        {
            // Replies don't have com-btns. They're directly under the parent class. 
            var com_segment = kebab_class.parent().attr('id');
            console.log('Reply =' +com_segment)
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
            console.log(result)
            if(result != ''){
                openForm();
                $('#editor').prop('disabled', true);
                $('#text-submit').prop('disabled', true);
                $('#message').text(result.question);
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
                console.log('correct')
                $('#editor').prop('disabled', false);
                $('#text-submit').prop('disabled', false);
                $('#error-message').text('');
                document.getElementById("myForm").style.display = "none";
            }
            else{
                console.log('incorrect')
                $('#text-submit').prop('disabled', true);
                $('#error-message').text('incorrect answer');
            }
        });
    });

})