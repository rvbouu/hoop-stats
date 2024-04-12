// JS file for what are the odds page
// taking two teams and compares overall win percent
// highlights winner in green
// shows both teams overall stats on sides
// at top: images for all teams that are drag/droppable
// reset button to clear out comparison square
// requestURL for individual teams :: http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/{team abbr}

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

function createTeamCards() {
  let savedData = readNBAFromStorage();
  console.log(savedData);
  let nbaTeams = savedData.sports[0].leagues[0].teams;
  console.log(nbaTeams);

  for(i = 0; i < nbaTeams.length; i++){
    const teamsSect = $('.teams'); // append img to here
    const img = $('<img>');
    img.attr('src', nbaTeams[i].team.logos[0].href).attr('alt', `${nbaTeams[i].team.displayName} logo`);
    img.appendTo(teamsSect);
  }
}
createTeamCards();