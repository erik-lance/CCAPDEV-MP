$(document).ready(function() {

    $('#comment-btn').on('click',function() {
        $('html, body').animate(
            {
              scrollTop: $(this).offset().top,
            },
            500,
            'linear'
        )
    })

    $('#share-btn').on('click', function() {



    })



})