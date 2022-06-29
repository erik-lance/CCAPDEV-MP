$(document).ready(function() {

    console.log('Edit type:')
    console.log($('#edit-type').text() === 'Editing Body')

    // Reminder: we have /e/:post_id
    // and we also have  /e/:post_id/:comment_id


    //Post Edit
    $('#text-submit').on('click', function() {

        var edit_post = false;

        if ($('#edit-type').text() === 'Editing Body') edit_post = true;

        
        if (edit_post)
        {
            // For Post editing
            var text = $('editor').text();
            var post_id = window.location.pathname.split("/").pop();
    
            if(text){
                $.get('/UpdatePost', {
                    text: text,
                    post_id: post_id
                }, function() {
                    window.location.href = "/p/" + post_id
                })
            }
        }
        else
        {
            //Comment Edit
            $('').on(click, function() {
                var text = $('').val();
                var post_id = window.location.pathname.split("/").pop();
                var comment_id = $(this).parent().parent().attr('id');

                console.log(comment_id);

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
        }
    })
    


})