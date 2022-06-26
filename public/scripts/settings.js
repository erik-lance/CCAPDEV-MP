$(document).ready(function() {
    console.log('hi')
    
    var img = null;


    // Saves the image to img variable upon changing file.
    $('#image-file').change(function(e) {
        img = e.target.files[0];
    })

    // Checks username, password, AND profile picture
    $('#account-submit').click( function() {
        var user = $('#user').val()
        var pass = $('#pass').val()
        var conf = $('#pass-confirm').val()

        var file = img;
        
        console.log(file.name)

        if (img) 
        {

        }
        else 
        {
            // If no new image
            // NEEDS CURRENTLY LOGGED IN USER
            $.get('/updateAcc', {
                user: user,
                pass: pass,


            })
        }

        

    })

    // Checks name AND bio
    $('#bio-submit').click (function() {
        var name = $('#full-name').val()
        var bio = $('#bio-editor').val()

        $.get('/updateProfile',
        {
            name: name,
            bio: bio
        })


    })

})

