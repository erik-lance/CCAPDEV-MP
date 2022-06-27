$(document).ready(function() {

    $('#form-user').keyup( function() {
        var user = $(this).val()
    
        $.get('/getCheckUsername', {username: user}, function(result) {
            if (result)
            {
                $('#form-user-log').css('border-bottom','1px solid black')
                $('#form-user-log').css('background-color','#f1f1f1')
                $('#message').text('')   
                
            }
            else
            {
                $('#form-user-log').css('border-bottom','1px solid red')
                $('#form-user-log').css('background-color','#f7b8b8')
                $('#message').text('Username does not exist.')     
            }
    
        })
    })
    
    $('#login').click( function() {
        console.log('Please Work')
        var user = $('#form-user-log').val()
        var pass = $('#form-pass-log').val()
    
        if (!user || !pass)
        {
            $('#message').text("Please fill all fields.")
            if(!user){
                $('#form-user-log').css('border-bottom','1px solid red')
                $('#form-user-log').css('background-color','#f7b8b8')
            }
            if(!pass)
            {
                $('#form-pass-log').css('border-bottom','1px solid red')
                $('#form-pass-log').css('background-color','#f7b8b8')
            }  
        }
        else
        {
            if(!user) 
            {
                $('#form-user-log').css('border-bottom','1px solid black')
                $('#form-user-log').css('background-color','#f1f1f1')
            }
            if(!pass)
            {
                $('#form-pass-log').css('border-bottom','1px solid black')
                $('#form-pass-log').css('background-color','#f1f1f1')
            }
            $('#message').text('')
            
            //Check with Erik if this goes to home page
            $.get('/CheckAcc', 
            {
                username: user,
                password: pass
            }, function() {
                window.location.href = "/"
            })
        }
    
    })





});