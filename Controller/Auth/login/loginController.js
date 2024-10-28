$(document).ready(function() {
    $(".btn").on('click', function (e) {
        e.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();

        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        console.log("Retrieved users:", users); 

    
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            $(".text-danger").text('Login successful!');
            window.location.href = '../homePage/homePageView.html';
        } else {
            $(".text-danger").text('Invalid email or password. Please try again.');
        }
    });
});
