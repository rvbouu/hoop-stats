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

function allTeams() {
  const allTeams = $('#allTeams');
  let savedData = readNBAFromStorage();
  let teams = savedData.sports[0].leagues[0].teams;
  localStorage.setItem('NBA Teams', JSON.stringify(teams))

  for (let i = 0; i < teams.length; i++) {
    const object = teams[i];
    const div = $('<div>');
    div.addClass('fw-bold text-center').attr('id', 'team').appendTo(allTeams);
    const aTag = $('<a>');
    aTag.attr('href', `${object.team.links[0].href}`).appendTo(div);
    const img = $('<img>');
    img.attr('src', object.team.logos[0].href).attr('alt', `${object.team.displayName} logo`).addClass('logos').appendTo(aTag);
    allTeams.append(div);
  }

  return allTeams;
}

allTeams();