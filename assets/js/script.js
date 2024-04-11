get-api-js
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

 main
