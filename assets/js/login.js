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

// gets infor from the API to diplay the team logos and names and appends to html
function teamChoices() {
  let savedData = readNBAFromStorage();
  let nbaTeams = savedData.sports[0].leagues[0].teams;
  // console.log(nbaTeams)
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
}

//makes chosen teams into an array and saves them to local storage
let chosenteams = []

if (!localStorage.getItem("teams")) localStorage.setItem("teams", JSON.stringify([]));

//global variables for login information
const submitBtn = document.querySelector('#submit');
const username = document.getElementById('username');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const form = document.getElementById('login')

// global variable for all users who have login credentials
let allUsers = []
let btn = document.getElementById('myBtn')
var span = document.getElementsByClassName("close")[0];

//saving login info to local storage
if (!localStorage.getItem("logininfo")) localStorage.setItem("logininfo", JSON.stringify([]));

function readcred() {
  let stringdata = localStorage.getItem('logininfo')
  allUsers = JSON.parse(stringdata) || []
  // console.log(allUsers)
}

function saveNewUser(logininfo) {
  allUsers.push(logininfo)
  savecred()
}

function savecred() {
  localStorage.setItem('logininfo', JSON.stringify(allUsers))
}

//saves username, password, and checked teams to one user
form.addEventListener('submit', function (event) {
  event.preventDefault();
  // console.log("ok")
  const teams = document.querySelectorAll("input[type='checkbox']:checked")
  // console.log(teams)
  let teamNames = [];
  for (let i = 0; i < teams.length; i++) {
    teamNames.push(teams[i].dataset.teamname)
  }
  // console.log(teamNames)
  const logins = {
    username: username.value,
    password: password.value,
    teams: teamNames
  }

  let userData = {
    username: username.value,
    password: password.value
  }
  localStorage.setItem('userData', JSON.stringify(userData))
  let userTeams = [];
  userTeams.push(teamNames);
  localStorage.setItem('userTeams', JSON.stringify(userTeams));

  //makes sure that all fields are properly filled in before redirecting to the home page
  if (username.value == '' || password.value == '' || password2.value == '') {
    $(submitBtn).popover({
      content: 'Please fill all fields before continuing'
    });
  } else if (password.value != password2.value) {
    $(submitBtn).popover({
      content: 'Passwords do not match'
    });
  } else {
    // console.log("ok")
    window.location.replace("./homepage.html");
    saveNewUser(logins)

    const found = allUsers.find(user => user.username === username.value && user.password === password.value && user.teams === teams.value)
    console.log(found)
  }
})
teamChoices();
// Every time the page loads, we want to get all users with login credentials
readcred();