// Redirects to a certain post under "pages" folder
function open_post(page_id) {
    // Need to render post HBS.
    window.location.href = "/p/"+page_id;
}

function open_editor() {
    window.location.href = "layouts/post-editor.hbs";
}

$(document).ready(function() {
    $('#submit').click(function() {
        let title = document.querySelector('#headline').value;
        let body = document.querySelector('#editor').value;

        let data = {
            title: title,
            body: body
        }
        
        $.get('/addPost', data);

        window.location.href="/";
    });
});