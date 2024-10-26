// $(document).ready(function () {
//     $(".btn").on('click', function (e) { 
//         e.preventDefault();
//         const username = $('#username').val();

//         const password = $('#pass').val();

//         const confirmPass = $('#rePass').val();

//         if (password != confirmPass) {
//             alert("dont match");
//             return;
//         }
//         console.log(username);
//         console.log(password);
//         console.log(confirmPass);
//         if (username && password && confirmPass) {
//             $.ajax({
//                 URL:'./model/user.json',
//                 type: 'POST',
//                 data: JSON.stringify({ username: username, password: password }),

//                 success: function(response) {
//                     alert('Registration successful!');

//                     saveUserData(email, password);
//                     window.location.href('../homePage/homePageView.html');
//                 },
//                 error: function() {
//                     alert('Error during registration.');
//                 }
//             });
//         } else {
//             alert('Please fill out all fields.');
//         }
//     });


// });
function saveUserData(username, password) {
    console.log(username)
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username: username, password: password });
    localStorage.setItem('users', JSON.stringify(users));
}
$(".btn").on('click', function (e) {
    e.preventDefault();

    const username = $('#username').val();
    const password = $('#pass').val();
    const confirmPass = $('#rePass').val();

    if (password !== confirmPass) {
        alert("Passwords do not match!");
        return;
    }

    // Simpan data pengguna
    if (username && password) {
        saveUserData(username, password);
        console.log(username)
        alert('Registration successful!');
        window.location.href = '../homePage/homePageView.html';

    }
});
