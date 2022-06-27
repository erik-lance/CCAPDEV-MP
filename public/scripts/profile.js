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
        var text = $('text-editor').val()
        // not sure if .text() ? paexperiment labyu


    })

})


