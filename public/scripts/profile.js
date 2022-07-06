// Redirects to a certain post under "pages" folder
function open_post(page_id) {
    window.location.href = "/p/"+page_id;
}

function open_editor() {
    window.location.href = "/p/post_editor";
}

$(document).ready(function() {
    $('#log-out').on('click',function() {
        $.get('/Logout',(res) =>
        {
            if (res) window.location.href="/"
        })
    })

    $('#profile-settings').on('click', function() {

        $.get('/s/settings');
        
        window.location.href="/s/settings";

    })

})


