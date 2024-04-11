const submitBtn= document.querySelector('#submit');
const username = document.getElementById('username');
const password = document.getElementById('password');



let logininfo = localStorage.getItem('logininfo')
let login = JSON.parse(logininfo) || []
submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const logins = {
        username: username.value,
        password: password.value,
        

    };
    




    if (username.value == '' || password.value == '') {
        alert('please fill all fields before continuing')

    } else { window.location.replace("./myteams.html"); 
    logins.push(logins)
    localStorage.setItem('logininfo', JSON.stringify(logins));
   
}

   
});

