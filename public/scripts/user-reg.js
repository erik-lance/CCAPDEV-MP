
$('#form-user').keyup( function() {
    var user = $(this).val()

    $.get('/getCheckUsername', {username: user}, function(result) {
        if (result)
        {
            $('#form-user').css('border-bottom','1px solid red')
            $('#form-user').css('background-color','#f7b8b8')
            $('#message').text('Username already exists.')
        }
        else
        {
            $('#form-user').css('border-bottom','1px solid black')
            $('#form-user').css('background-color','#f1f1f1')
            $('#message').text('')            
        }

    })
})

$('#form-pass-confirm').keyup(function() {
    var pass = $('#form-pass').val()
    var conf = $('#form-pass-confirm').val()

    if (pass != conf) {
        $('#form-pass-confirm').css('border-bottom','1px solid red')
        $('#form-pass-confirm').css('background-color','#f7b8b8')
        $('#message').text('Password does not match.')
    }
    else {
        $('#form-pass-confirm').css('border-bottom','1px solid black')
        $('#form-pass-confirm').css('background-color','#f1f1f1')
        $('#message').text('')
    }

})

$('#sign_up').click( function() {

    var user = $('#form-user').val()
    var pass = $('#form-pass').val()
    var conf = $('#form-pass-confirm').val()

    if (!user || !pass)
    {
        $('#message').text("Please fill all fields.")
        if(!user){
            $('#form-user').css('border-bottom','1px solid red')
            $('#form-user').css('background-color','#f7b8b8')
        }
        if(!pass)
        {
            $('#form-pass').css('border-bottom','1px solid red')
            $('#form-pass').css('background-color','#f7b8b8')
        }  
    }
    else if (pass != conf)
    {
        $('#message').text('Password does not match.')
    }
    else if (pass.isLength({min: 6}))
    {
        $('#form-pass').css('border-bottom','1px solid red')
        $('#form-pass').css('background-color','#f7b8b8')
    }
    else
    {
        if(!user) 
        {
            $('#form-user').css('border-bottom','1px solid black')
            $('#form-user').css('background-color','#f1f1f1')
        }
        if(!pass)
        {
            $('#form-pass').css('border-bottom','1px solid black')
            $('#form-pass').css('background-color','#f1f1f1')
        }
        $('#message').text('')

        $.get('/addAcc', 
        {
            username: user,
            password: pass
        }, function() {
            window.location.href = "/"
        })
    }

})