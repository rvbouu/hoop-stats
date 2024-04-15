

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





// function teamChoices() {
//   let savedData = readNBAFromStorage();
//   let nbaTeams = savedData.sports[0].leagues[0].teams;

//   for(i=0; i<nbaTeams.length; i++){
//     const teamSect = $('.teams');
//     const mainDiv = $('<div>');
//     mainDiv.addClass('team-logo col text-center');
//     const pTag = $('<p>');
//     pTag.text(nbaTeams[i].team.displayName).addClass('fw-bold text-center').attr('id','team-name');

//     const img =$('<img>');
//     img.attr('src', nbaTeams[i].team.logos[0].href).attr('alt', `${nbaTeams[i].team.displayName} logo`).attr('style','width:75px;height:75px;');
//     mainDiv.append(img, pTag);
//     mainDiv.appendTo(teamSect);

//   }
// }


// const input= document.createElement('input')
// input.type='checkbox'
// const parent= document.getElementById('checkboxes')
// parent.appendchild(input)

function teamChoices() {
  let savedData = readNBAFromStorage();
  let nbaTeams = savedData.sports[0].leagues[0].teams;
  console.log(nbaTeams)
  for (i = 0; i < nbaTeams.length; i++) {
    let divEl = $('<div>')
    divEl.addClass('m-4')
    let input= $(`<input data-teamname="${nbaTeams[i].team.displayName}">`)
    input.attr('type', 'checkbox').addClass('form-check-input')
    const teamSect = $('.teams');
    const mainDiv = $('<label>');
    mainDiv.addClass('team-logo text-center form-check-label').text(nbaTeams[i].team.displayName);
    //const pTag = $('<p>');
    //pTag.text(nbaTeams[i].team.displayName).addClass('fw-bold text-center').attr('id', 'team-name');

    const img = $('<img>');
    img.attr('src', nbaTeams[i].team.logos[0].href).attr('alt', `${nbaTeams[i].team.displayName} logo`).attr('style', 'width:30px;height:30px;')
   // mainDiv.append(pTag, img);
    divEl.append(input, img, mainDiv);
    teamSect.append(divEl);

    // const input = document.createElement('input')
    // input.type = 'checkbox'
    // const parent = document.getElementById('checkboxes')
    // parent.appendchild(input)

  }
}

let chosenteams = []

if (!localStorage.getItem("teams")) localStorage.setItem("teams", JSON.stringify([]));


function readteams() {
  let stringdata = localStorage.getItem('teams')
  allUsers = JSON.parse(stringdata) || []
  console.log(chosenteams)
}

function saveTeams(teams) {
  allUsers.push(teams)
  savecred()
}

function savecred() {
  localStorage.setItem('teams', JSON.stringify(chosenteams))
}


teamChoices();





// nbaTeams.addEventListener('mouseenter', () => {
//   textToHighlight.style.backgroundColor = 'yellow';
// });



const submitBtn = document.querySelector('#submit');
const username = document.getElementById('username');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const form = document.getElementById('login')


// global variable for all users who have login credentials
let allUsers = []


let btn = document.getElementById('myBtn')
var span = document.getElementsByClassName("close")[0];


if (!localStorage.getItem("logininfo")) localStorage.setItem("logininfo", JSON.stringify([]));

//var arr = JSON.parse(localStorage.getItem("logininfo"));
//console.log(arr)

// function readCheckboxes() {
//   let stringdata = localStorage.getItem('teamchoices')
//   userChoices = JSON.parse(stringdata) || []
//   console.log(userChoices)
// }

// function saveCheckboxes(){
//   let checkedBoxes= JSON.parselocalstorage.getitem('teamchoices');
//   if (checkedBoxes == true) {
//     document.getElementById("teamchoices").checked = true;
// }
// }

// function savecredits() {
//   localStorage.setItem('teamchoices', JSON.stringify(userChoices))
// }

function readcred() {
  let stringdata = localStorage.getItem('logininfo')
  allUsers = JSON.parse(stringdata) || []
  console.log(allUsers)
}

function saveNewUser(logininfo) {
  allUsers.push(logininfo)
  savecred()
}

function savecred() {
  localStorage.setItem('logininfo', JSON.stringify(allUsers))
}

// let logininfo = localStorage.getItem('logininfo')
// let login = JSON.parse(logininfo) || []
form.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log("ok")
  const teams = document.querySelectorAll("input[type='checkbox']:checked")
  console.log(teams)
  const teamNames = []
  for (let i=0; i<teams.length; i++) {
    teamNames.push(teams[i].dataset.teamname)
  }
  console.log(teamNames)
  const logins = {
    username: username.value,
    password: password.value,
    teams: teamNames
  }


  //logininfo.push(logins)
  //localStorage.setItem("logininfo", JSON.stringify(logins)) 
  //login.push(logins);
  //localStorage.setItem("logininfo", JSON.stringify(login))




  if (username.value == '' || password.value == '' || password2.value == '' || teams.vale=='') {
    return alert('please fill all fields before continuing')
  } else if (password.value != password2.value) {
    return alert('Passwords do not match')
  } else {
    console.log("ok")
    window.location.replace("./homepage.html")
    saveNewUser(logins)

    const found = allUsers.find(user => user.username === username.value && user.password === password.value && user.teams === teams.value)
    console.log(found)
  }


})


//else { window.location.replace("./homepage.html"); 


// Every time the page loads, we want to get all users with login credentials
readcred();