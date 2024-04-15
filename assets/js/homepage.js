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

// get stats here


// function getStats {

// }