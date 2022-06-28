// Redirects to a certain post under "pages" folder
function open_post(page_id) {
    window.location.href = "/p/"+page_id;
}

function open_editor() {
    window.location.href = "/p/post_editor";
}

$(document).ready(function() {
    $('#log-out').on('click',function() {
        $.get('/Logout');
        window.location.href = "/";
    })

    $('#profile-settings').on('click', function() {

        console.log('huh')
        $.get('/s/settings');
        
        window.location.href="/s/settings";

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
        }
        // not sure if .text() ? paexperiment labyu

        $.get('/Comment', 
            {
                text: text,
                post_id: post_id
            }, function() {
                window.location.href = "/"
        })

    })

})


