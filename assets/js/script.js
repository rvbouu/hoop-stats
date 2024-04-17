let nbaTeams;
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
  // console.log(requestURL);
  // fetch request gets a list of all teams in the NBA
  fetch(requestURL)
    .then(response => {
      // converts a json string into a js object/array
      return response.json();
    })
    // saving converted data to localStorage 
    .then(data => {
      // console.log(data);
      nbaTeams = data.sports[0].leagues[0].teams;
      localStorage.setItem('NBA', JSON.stringify(data));

      // gets infor from the API to diplay the team logos and names and appends to html

      for (i = 0; i < nbaTeams.length; i++) {
        let divEl = $('<div>')
        divEl.addClass('m-4')
        let input = $(`<input data-teamname="${nbaTeams[i].team.displayName}">`)
        input.attr('type', 'checkbox').addClass('form-check-input')
        const teamSect = $('.teams');
        const mainDiv = $('<label>');
        mainDiv.addClass('team-logo text-center form-check-label').text(nbaTeams[i].team.displayName);
    
        const img = $('<img>');
        img.attr('src', nbaTeams[i].team.logos[0].href).attr('alt', `${nbaTeams[i].team.displayName} logo`).attr('style', 'width:30px;height:30px;')
    
        divEl.append(input, img, mainDiv);
        teamSect.append(divEl);
      }
    })
    // catches error if occurs and alerts user that something when wrong
    .catch(function (error) {
      console.log(error);
      alert('An error has occured.');
    });
}


// gets login values from login form
let loginInfo = JSON.parse(localStorage.getItem('logininfo'));
// console.log(loginInfo);
let loginUsername = $('#login-username').val();
let loginPassword = $('#login-password').val();

// where favorite teams from loginInfo localStorage will get saved to
let userTeams = [];
// login button DOM
const loginBtn = $('.login-btn');

// checks login values vs. accounts created through submit form
// if found, allows login
function checkLogin() {
  let loginUsername = $('#login-username').val();
  let loginPassword = $('#login-password').val();

  let match = loginInfo.filter(user => {
    return loginUsername === user.username && loginPassword === user.password;
  })
  if (match.length) {
    getUserInfo();
    getTeams()
    document.location.href = './homepage.html'
  } else {
    $(loginBtn).popover({
      content: 'Username or password is incorrect'
    });
  }
  return match;
}

// sets login user's data to localStorage
function getUserInfo() {
  let userData = {
    username: $('#login-username').val(),
    password: $('#login-password').val(),
  }
  localStorage.setItem('userData', JSON.stringify(userData))
  return userData;
}

// gets teams associated with login user to populate homepage
function getTeams() {
  let userData = JSON.parse(localStorage.getItem('userData'));
  for (i = 0; i < loginInfo.length; i++) {
    if (userData.username == loginInfo[i].username && userData.password == loginInfo[i].password) {
      userTeams.push(loginInfo[i].teams);
      localStorage.setItem('userTeams', JSON.stringify(userTeams))
    }
  }
  // getUserInfo();
}

// calling getApi function
getApi();

// logout button
$('#logout').on('click', function (e) {
  e.preventDefault();
  // console.log('logout')
  window.location.replace('./index.html');
});

// login button
loginBtn.on('click', function () {
  // e.preventDefault();
  checkLogin();
})