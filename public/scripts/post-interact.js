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
        index = $(this).parent().parent().attr('id');
        
        var uname = $(this).parent().find('span').text();
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
        var comment_id = $(this).parent().parent().attr('id');;

        if(text){
            $.get('/UpdateComment', {
                text: text,
                post_id: post_id,
                comment_id: comment_id
            }, function() {
                window.location.href = "/p/" + post_id
            })
        }
    })
    */


})