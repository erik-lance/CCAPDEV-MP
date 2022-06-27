$(document).ready(function() {
    console.log('hi')
    
    var img = null;
    var actualUsername = $('#actual-username').text()
    
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
        img = e.target.files[0];

        readUrl(this);
    })

    function updateImage() {
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


    // Checks username, password, AND profile picture
    $('#account-submit').click( function() {
        var pass = $('#pass').val()
        var conf = $('#pass-confirm').val()

        var file = img;

        var freeUsername = true;

        var passwordChangeable = (pass && conf && (pass === conf));
        if (passwordChangeable)
        {
            // Change pasword pa hash hehe
        }

        if (img)
        {
            updateImage();
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

