function openForm() {
    document.getElementById("myForm").style.display = "block";
}
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    $('#submit').prop('disabled', true);
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

    /* 
    Post Edit
    $('').on(click, function() {
        var text = $('').val();
        var post_id = window.location.pathname.split("/").pop();

        if(text){
            $.get('/UpdatePost', {
                text: text,
                post_id: post_id
            }, function() {
                window.location.href = "/p/" + post_id
            })
        }
    })
    
    Comment Edit
    $('').on(click, function() {
        var text = $('').val();
        var post_id = window.location.pathname.split("/").pop();
        var comment_id = $(this).parent().parent().attr('id');
        console.log(commend_id);
        //if(text){
        //    $.get('/UpdateComment', {
        //        text: text,
        //        post_id: post_id,
        //        comment_id: comment_id
        //    }, function() {
        //        window.location.href = "/p/" + post_id
        //    })
        //}
    })
    */

    $('#editor').on('click', function() {
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