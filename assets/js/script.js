

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





/*function chooseTeams(){
  let apiInfo= readNBAFromSorage()
  let teams= apiInfo.sports[0].leagues[0].teams

  for(i=0; i<teams.length; i++){
    const displayTeams= $('<.teams');
    const modalDisplay= $('<div>')
    modalDisplay.addClass('team-logo col text-center');


    const  pTag= $('<p>');
    pTag.text(teams[i].team.displayName)



  }

}
chooseTeams() */


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

let faveTeams = [];
function getFaveTeams(){
  let userTeamsLs = JSON.parse(localStorage.getItem('userTeams'));
  let nbaTeams = JSON.parse(localStorage.getItem('NBA Teams'));
  let userTeams = userTeamsLs[0];

  
  for(let i = 0; i < userTeams.length; i++){
    let team = userTeams[i];
    for(let i = 0; i < nbaTeams.length; i++){
      if(team == nbaTeams[i].team.displayName){
        let teamInfo = {
          name: nbaTeams[i].team.displayName,
          logo: nbaTeams[i].team.logos[0].href,
          web: nbaTeams[i].team.links[0].href,
          roster: nbaTeams[i].team.links[1].href,
          schedule: nbaTeams[i].team.links[3].href
        }
        faveTeams.push(teamInfo);
      }
    }
  }
  console.log(faveTeams)
}
getFaveTeams()
function createFaveTeams(){
  const teamDisp = $('.row-content');
  for(let i = 0; i < faveTeams.length; i++){
    let div = $('<div>');
    
    let web = $('<a>');
    web.attr('href', `${faveTeams[i].web}`).appendTo(div);

    let img = $('<img>');
    img.attr('src', `${faveTeams[i].logo}`).attr('alt', `${faveTeams[i].name} logo`).appendTo(web);

    let h4 = $('<h4>');
    h4.text(`${faveTeams[i].name}`).appendTo(div);
    let roster = $('<a>');
    roster.attr('href', `${faveTeams[i].roster}`).text('Roster').appendTo(div);
    let schedule = $('<a>');
    schedule.attr('href', `${faveTeams[i].schedule}`).text('Schedule').appendTo(div);
    div.appendTo(teamDisp);
  }
}
createFaveTeams()

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

$(document).ready(function() {
  loginBtn.click(function() {
    $(".login-data").each(function() {
      $val = $(this).val();
      if ($val == '') {      
        $(this).popover({
          content: "Invalid"
        });
        $(this).popover('show');
      }
    })
  })
})





