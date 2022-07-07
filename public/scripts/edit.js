$(document).ready(function() {

    //Post Edit
    $('#text-submit').on('click', function() {
        var edit_post = false;

        if ($('#edit-type').text() === 'Editing Body') edit_post = true;

        
        if (edit_post)
        {
            // For Post editing
            var text = $('#editor').val();
            var post_id = window.location.pathname.split("/")[2];
    
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
            var text = $('#editor').val();
            var post_id = window.location.pathname.split("/")[2];
            var comment_id = window.location.pathname.split("/").pop();
            if(text){
                $.get('/UpdateComment', {
                    text: text,
                    post_id: post_id,
                    comment_id: comment_id
                }, function() {
                    window.location.href = "/p/" + post_id
                })
            }
            
        }
    })
    


})