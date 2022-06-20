$(document).ready(function () {
    
    $('#submit').click(function () {
        // your code here
        let name = document.querySelector('#name').value;
        let refno = document.querySelector('#refno').value;
        let amount = document.querySelector('#amount').value;

        var data = {
            name: name,
            refno: refno,
            amount: amount,
        };

        if(name != '' && refno != '' && amount != ''){
            document.getElementById('name').value = '';
            document.getElementById('refno').value = '';
            document.getElementById('amount').value = '';
            $('#error').text('');

            $.get('/add', data, function () {
                var entry = document.createElement('div');
                entry.setAttribute('class', 'card');

                var img = document.createElement('img');
                img.setAttribute('class', 'icon');
                img.setAttribute('src', '/images/icon.webp');

                var info = document.createElement('div');
                info.setAttribute('class', 'info');

                var newName = document.createElement('p');
                newName.setAttribute('class', 'text');
                newName.innerHTML = data.name;

                var newRefno = document.createElement('p');
                newRefno.setAttribute('class', 'text');
                newRefno.innerHTML = data.refno;

                var newAmount = document.createElement('p');
                newAmount.setAttribute('class', 'text');
                newAmount.innerHTML = '₱ ' + parseFloat(data.amount).toFixed(2);

                info.append(newName, newRefno, newAmount);

                var remove = document.createElement('button');
                remove.setAttribute('class', 'remove');
                remove.innerHTML = 'X';

                entry.append(img, info, remove);
                document.getElementById('cards').appendChild(entry);
            });
        } 
        else{
            $('#error').text('Fill up all fields.');
            $('#refno').css('background-color', '');
        };
    });
})