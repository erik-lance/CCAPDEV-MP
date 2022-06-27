$(document).ready(function() {
    console.log('hi')
    
    var img = null;

    var actualUsername = $('#user').val()

    function disableButton() {

    }

    function enableButton() {

    }


    //$('#bio-submit').prop('disabled', true)

    // Courtesy of JSFiddle https://codepen.io/maqnus/pen/oedWmq
    const fileOut = document.getElementById('currImage');

    const readUrl = event => {
        if(event.files && event.files[0]) {
            let reader = new FileReader();
                reader.onload = event => {
                    fileOut.src = event.target.result;
                }
                reader.readAsDataURL(event.files[0])
                
        }
    }


    // Saves the image to img variable upon changing file.
    $('#image-file').change(function(e) {
        console.log(e.target)
        img = e.target.files[0];

        readUrl(this);
    })

    // Checks username, password, AND profile picture
    $('#account-submit').click( function() {
        var user = $('#user').val()
        var pass = $('#pass').val()
        var conf = $('#pass-confirm').val()

        var file = img;

        


        var freeUsername = true;

        
        if (pass && conf) 
        {
            // There is a password change user desires

        }
        else if (pass || conf) 
        {
            // User might want to change password OR not. Has at least one fields open.
        }
        else 
        {   
            // Checks if current username is just the same or not
            if (user === actualUsername) 
            {
                if (img)
                {
                    var fileData = new FormData();
                    fileData.append('file',img,actualUsername+".jpg");
                    fileData.append('file_name',img.name)

                    console.log('omg hi')

                    $.ajax({
                        url:'/updateImage',
                        type: 'POST',
                        cache: false,
                        processData: false,
                        contentType: false,
                        data: fileData,
                        success: function(res) {
                            console.log('wow')
                        }
                    })
                }
            }
            else
            {
                // Okay. Let's check other fields!
                $.get('/getCheckUsername', {username: user}, function(result) 
                {
                    if (result) freeUsername = false;
                    else freeUsername = true;
                })
            }


            /*

            if (img) 
            {
                console.log(file.name)
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

            */

        }
        

    })

    // Checks name AND bio
    $('#bio-submit').on('click',function() {
        console.log('lool')

        var name = $('#full-name').val()
        var bio = $('#bio-editor').val()

        $.get('/updateProfile',
        {
            name: name,
            bio: bio
        }, function (result) {

            if (result) {
                $('#message').text('Profile update succesful!')
            }

        })


    })

})

