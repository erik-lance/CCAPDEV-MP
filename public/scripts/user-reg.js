$('#sign-up').click( function() {

    var user = $('form-user').val()
    var pass = $('form-pass').val()

    // TODO:  NOTE PASSWORD MUST BE HASHED
    $.get('/addAcc',
            {
                username: user,
                password: pass
            })

})