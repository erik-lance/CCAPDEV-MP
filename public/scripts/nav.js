$(document).ready(function () {
    $('#nav-search').click(function() {
        var word = document.querySelector('#search').value;
        let data = {
            search: word
        }
        // Ajax call to search (no route yet, make one maybe?)
        // searches for posts based on title!
        
        if(word != ""){
           window.location.href="/search/" + word;
        }
    })

    $('#go-to-profile').on('click', function() {
        var username;

        $.get('/getSessionUser',function(res) {
            if (res !== null) username = res;
            else username = null;

            if (username) window.location.href="/u/"+username;
            else window.location.href="/s/user_sign"
        })
    })
});