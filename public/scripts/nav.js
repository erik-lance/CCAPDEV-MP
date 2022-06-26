$(document).ready(function () {
    $('#nav-search').click(function() {
        var word = document.querySelector('#search').value;
        let data = {
            search: word
        }
        // Ajax call to search (no route yet, make one maybe?)
        // searches for posts based on title!
        
        if(word != ""){
            $.get('/search_res', data);
        }
        
        
        // Must return to home page
        //window.location.href="/search_res"
    })
});