// gets NBA data from localStorage
function readNBAFromStorage() {
  let stringData = localStorage.getItem('NBA');
  let nba = JSON.parse(stringData) || [];
  return nba;
};

// saves NBA data to localStorage
function saveNBAToStorage(nba) {
  let savedNBA = JSON.stringify(nba);
  localStorage.setItem('NBA', savedNBA);
};

// function populate team cards (logos)
// make logos clickable
// click takes you to NBA page

// div to hold everything
// append an a tag to div; add attr href with link
// append img tag to a tag; image has logo href
// append p tag to div; team names