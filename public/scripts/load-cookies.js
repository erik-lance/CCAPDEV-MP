$(document).ready(function()
{
    var u_string = $('#author-id').text()


    $.get('/countVotes', {user: u_string}, function(succ)
    {
        if (succ)
        {
            $('#num-votes').text(succ)
        }
        else
        {
            $('#num-votes').text(0)
        }
    })
})