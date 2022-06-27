// Redirects to a certain post under "pages" folder
function open_post(page_id) {
    window.location.href = "/p/"+page_id;
}

$(document).ready(function() {
    $('#log-out').on('click',function() {
        $.get('/Logout');
        window.location.href = "/";
    })


    // Submits comments
    $('#text-submit').on('click', function() {
        var text = $('text-editor').val()
        // not sure if .text() ? paexperiment labyu


    })

})


