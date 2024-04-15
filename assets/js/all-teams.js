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
  const allTeams = $('<main>');
  allTeams.addClass('col text-center').attr('id', 'allTeams');
  const div = $('<div>');
  div.addClass('fw-bold text-center').attr('id', 'team').appendTo(allTeams);
  const input = $('<input>');
  input.addClass('form-check-input').attr('id', 'check').appendTo(div);
  const logo = $('<label>');
  logo.addClass('form-check-label').text().attr('href', '').appendTo(div);
  const img = $('<img>');
  img.attr('src',team.logo).attr('alt', `${teams.team.logo} logo`).addClass('logos');
  teamCard.append(img, div);


  return allTeams;
}

allTeams();