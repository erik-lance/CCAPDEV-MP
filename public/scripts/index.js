$(document).ready(function () {
    
    //log in from index.hbs
    $('#signup').click(function () {
        console.log("click");
        $.get('/user_sign');
    });

    //signup in user_sign.hbs
    $('#newsignup').click(function () {
        console.log("click2");
        $.get('/user_reg');
    });

    //check if same password and username of acc
    $('#login').click(function () {
        // your code here
        var username = $(this).val();
        var password = $(this).val();
        var data = {
            username: username,
            password: password
        };

        $.get('/getCheckAcc',data, function(result){
            console.log('checking');
            if(result.username == refno && result.password == password){
                console.log("acc found");
                $.get('/');
            }
            else{
                console.log('invalid pw or un');
                $('#login').prop('disabled', false);
            }

        });
    });

    //check if un is taken
    $('#form-user').keyup(function () {
        var username = $(this).val();
        var data = {
            username: username
        };

        $.get('/getCheckUsername',data, function(result){
            if(result.username == username){
                $('#sign-up').prop('disabled', true);
                $('#message').text('username is taken.');
            }
            else{
                $('#sign-up').prop('disabled', false);
            }

        });
    });

    $('#sign-up').click(function () {
        let username = document.querySelector('#form-user').value;
        let password = document.querySelector('#form-pass').value;

        var data = {
            username: username,
            name: "",
            password: password,
            email: "",
            user_type: "infeeder",
            bio: "",
            profile_pic: "",
            following: 0,
            followers: 0,
            cookies: 0
        };

        if(username != '' && password != ''){
            document.getElementById('form-user').value = '';
            document.getElementById('form-pass').value = '';

            $.get('/addAcc', data, function () {
                $.get('/user_sign');
            });

        } 
        else{
            console.log('ala man laman');
        };
    });

    $('#profile-dets').click(function() {
        
    });

    //
    $('#search-bar').click(function () {
        console.log("click3");

        let search = document.querySelector('#search').value;

        $.get('/add', data, function () {

        })
    });
})