

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

// logout button
$('#logout').on('click', function(e){
  e.preventDefault();
  console.log('logout')
  window.location.replace('./index.html');
});






