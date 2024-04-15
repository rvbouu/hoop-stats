event.preventDefault();
  const logins = {
    username: username.value,
    password: password.value,


  }

  
  //logininfo.push(logins)
  //localStorage.setItem("logininfo", JSON.stringify(logins)) 
  //login.push(logins);
  //localStorage.setItem("logininfo", JSON.stringify(login))




  if (username.value == '' || password.value == '' || password2.value == '') {
    alert('please fill all fields before continuing')

  } 
  if (password.value != password2.value) {
    alert('Passwords do not match')
  } else {
    // check to see if we have an object in allUsers matching the username and password
    const found = allUsers.find( user => user.username === username.value && user.password ===  password.value )
    console.log(found)
  }