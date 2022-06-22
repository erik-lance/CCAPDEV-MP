// Redirects to a certain post under "pages" folder
function open_post(page_id) {
    // Need to render post HBS.
    window.location.href = "p/"+page_id;
}

function open_editor() {
    window.location.href = "layouts/post-editor.hbs";
}