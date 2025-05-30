function saveUserData(username, password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ email: username, password: password });  
    localStorage.setItem('users', JSON.stringify(users));
}

$(".btn").on('click', function (e) {
    e.preventDefault();

    const username = $('#username').val();
    const password = $('#pass').val();
    const confirmPass = $('#rePass').val();

    if (password !== confirmPass) {
        $(".text-danger").text("Passwords do not match!");
        return;
    }
    console.log(username)
    console.log(password)
    console.log(confirmPass)
    if (username && password && confirmPass) {
        saveUserData(username, password);
        window.location.href = '../homePage/homePageView.html';
    } else {
        $(".text-danger").text('Please fill out all fields.');
    }
});
