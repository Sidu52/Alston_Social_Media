$(document).ready(function () {
    $('#login-link').click(function (event) {
        event.preventDefault();
        var email = 'hitechsidu992@gmail.com';
        var password = '12';
        $.ajax({
            url: '/user/loginuser',
            method: 'POST',
            data: {
                email: email,
                password: password
            },
            success: function (response) {
                // Handle the response from the server
                window.location.href = '/user/alstonpage';
            },
            error: function (xhr, status, error) {
                // Handle any errors
                console.log(error);
            }
        });
    })
});

$('#userlogin').click(function (event) {
        event.preventDefault();
        var email = $('#email-input').val();
        var password = $('#password-input').val();
        $.ajax({
            url: '/user/loginuser',
            method: 'POST',
            data: {
                email: email,
                password: password
            },
            success: function (response) {
                // Handle the response from the server
                window.location.href = '/user/alstonpage';
            },
            error: function (xhr, status, error) {
                // Handle any errors
                console.log(error);
            }
        });

        $('#login-link').click(function (event) {
            event.preventDefault();
            var email = 'hitechsidu992@gmail.com';
            var password = '12';
            $.ajax({
                url: '/user/loginuser',
                method: 'POST',
                data: {
                    email: email,
                    password: password
                },
                success: function (response) {
                    // Handle the response from the server
                    alert('Logged-In-Successfully');
                    window.location.href = '/user/alstonpage';
                },
                error: function (xhr, status, error) {
                    // Handle any errors
                    console.log(error);
                }
            });
        })
    })

