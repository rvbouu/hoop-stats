

// gets NBA data from localStorage
function readNBAFromStorage() {
  let stringData = localStorage.getItem('NBA');
  let nba = JSON.parse(stringData) || [];
  return nba;
}

// saves NBA data to localStorage
function saveNBAToStorage(nba) {
  let savedNBA = JSON.stringify(nba);
  localStorage.setItem('NBA', savedNBA);
}

// gets NBA data from api and saves it to localStorage
function getApi() {
  // URL where we're requesting data from - ESPN NBA
  const requestURL = `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams`;
  console.log(requestURL);

  // fetch request gets a list of all teams in the NBA
  fetch(requestURL)
    .then(response => {
      // converts a json string into a js object/array
      return response.json();
    })

    // saving converted data to localStorage 
    .then(data => {
      console.log(data);
      localStorage.setItem('NBA', JSON.stringify(data))
    })

    // catches error if occurs and alerts user that something when wrong
    .catch(function (error) {
      console.log(error);
      alert('An error has occured.');
    });
}
getApi();

const submitBtn = document.querySelector('#submit');
const username = document.getElementById('username');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const form = document.getElementById('login')
// global variable for all users who have login credentials
let allUsers = []

let modal= document.getElementById('myModal')
let btn= document.getElementById('myBtn')
var span = document.getElementsByClassName("close")[0];



btn.onclick = function() {
    modal.style.display = "block";
  }


if (!localStorage.getItem("logininfo")) localStorage.setItem("logininfo", JSON.stringify([]));

//var arr = JSON.parse(localStorage.getItem("logininfo"));
//console.log(arr)

function readcred(){
  let stringdata = localStorage.getItem('logininfo')
  allUsers = JSON.parse(stringdata) || []
  console.log(allUsers)
}

function saveNewUser(logininfo){
  allUsers.push(logininfo)
  savecred()
}

function savecred(){
  localStorage.setItem('logininfo', JSON.stringify(allUsers))
} 

// let logininfo = localStorage.getItem('logininfo')
// let login = JSON.parse(logininfo) || []
form.addEventListener('submit', function(event) {
  event.preventDefault();
  console.log("ok")
  const logins = {
    username: username.value,
    password: password.value,


  }

  
  //logininfo.push(logins)
  //localStorage.setItem("logininfo", JSON.stringify(logins)) 
  //login.push(logins);
  //localStorage.setItem("logininfo", JSON.stringify(login))




  if (username.value == '' || password.value == '' || password2.value == '') {
    return alert('please fill all fields before continuing')
  } else if (password.value != password2.value) {
    return alert('Passwords do not match')
  } else {
    console.log("ok")
    //window.location.replace("./homepage.html")
    saveNewUser(logins)
    const found = allUsers.find( user => user.username === username.value && user.password ===  password.value )
    console.log(found)
  }


})


//else { window.location.replace("./homepage.html"); 


// Every time the page loads, we want to get all users with login credentials
readcred();