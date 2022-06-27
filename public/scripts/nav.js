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
});