

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

let loginInfo = JSON.parse(localStorage.getItem('logininfo'));
console.log(loginInfo);
let loginUsername = $('#login-username').val();
let loginPassword = $('#login-password').val();

let userTeams = [];
const loginBtn = $('.login-btn');

function checkLogin() {
  let loginUsername = $('#login-username').val();
  let loginPassword = $('#login-password').val();

  let match = loginInfo.filter(user => {
    return loginUsername === user.username && loginPassword === user.password;
  })
  if (match.length) {
    document.location.href = './homepage.html'
  } else {
    $(loginBtn).popover({
      content: 'Username or password is incorrect'
    });
  }
  return match;
}

function getUserInfo() {
  let userData = {
    username: $('#login-username').val(),
    password: $('#login-password').val(),
  }
  localStorage.setItem('userData', JSON.stringify(userData))
  checkLogin();
}

function getTeams(){
  let userData = JSON.parse(localStorage.getItem('userData'));
  for(i = 0; i < loginInfo.length; i++){
    if(userData.username == loginInfo[i].username && userData.password == loginInfo[i].password){
      userTeams.push(loginInfo[i].teams);
      localStorage.setItem('userTeams',JSON.stringify(userTeams))
    }
  }
}

// logout button
$('#logout').on('click', function (e) {
  e.preventDefault();
  console.log('logout')
  window.location.replace('./index.html');
});

loginBtn.on('click', function (e) {
  e.preventDefault();
  getUserInfo();
  getTeams()
})





