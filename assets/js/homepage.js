// stats - win loss summary and overall summary. 
//  for players link to the roster from espn
// schedule - show upcoming game

// need to get api set up to get the information

// gets NBA data from localStorage
function readNBAFromStorage() {
  let stringData = localStorage.getItem('NBA');
  let nba = JSON.parse(stringData) || [];
  console.log(stringData);
  return nba;
}

// saves NBA data to localStorage
function saveNBAToStorage(nba) {
  let savedNBA = JSON.stringify(nba);
  localStorage.setItem('NBA', savedNBA);
}

//read from local storage
function readTeamsFromStorage() {
  let stringData = localStorage.getItem('teamArray');
  let teamArray = JSON.parse(stringData) || [];
  return teamArray;
}

// saves NBA data to localStorage
function saveTeamsToStorage(teamArray) {
  let savedTeams = JSON.stringify(teamArray);
  localStorage.setItem('teamArray', savedTeams);
}
// gets favorites from index
// function populateFavTeams() {
//   const main = $('.row-content')
//   for (let i=0; i < teams.length; i++){
//     let div = $('<div>');
//     div.addClass('team').appendTo(main);
//     let aTag = $('<a>');
//     aTag.attr('href', link to espn).appendTo(div);
//     let img = $('<img>');
//     img.attr = ('href', "", alt: "", rel: ["full", "default"]);appendTo(aTag);
//     let h3 = $('<h3>');
//     h3.text(team name from teamArray).appendTo(div);
//     let overall = $('<p>');
//     overall.text(overall stats for the team).appendTo(div);
//   }
// }

function scheduleAPI(){
  const requestURL ='https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard';

fetch(requestURL)
  .then(function(response){
    return response.json();
  })

.then(function(data){
  console.log(data);
  let schedule = []
  let event = {
    date: data.event[0].status.type.detail,
    name: data.event[0].name
  }
})
  .then(function(data){

  for(let i = 0; i < teams.length; i++){
    const obj = data[i];
    console.log(obj.data);

    // const pTag = document.createElement('p');
    // pTag.textContent

}





// function upcomingGames {
//   const games = $('aside')
}
scheduleAPI();