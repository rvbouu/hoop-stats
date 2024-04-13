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

// gets NBA data from localStorage
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

function getTeamApi() {
  let teamArray = readTeamsFromStorage();
  let savedData = readNBAFromStorage();
  let teams = savedData.sports[0].leagues[0].teams;
  localStorage.setItem('NBA Teams', JSON.stringify(teams))
  console.log(teams)
  count = 0;
  for (i = 0; i < teams.length; i++) {
    count++
    const requestURL = `http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${teams[i].team.abbreviation}`;
    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let team = {
          id: data.team.abbreviation,
          name: data.team.displayName,
          logo: data.team.logos[0].href,
          winPerc: data.team.record.items[0].stats[9].value,
          overall: data.team.record.items[0].summary,
          home: data.team.record.items[1].summary,
          away: data.team.record.items[2].summary,
          status: 'teams'
        }
        teamArray.push(team);
        saveTeamsToStorage(teamArray);
        renderTeam();
      })
  }
}
getTeamApi();


function createTeamCard(team) {
  // let teams = JSON.parse(localStorage.getItem('teamArray'))
  // console.log(teams)
  // for (i = 0; i < teams.length; i++) {
  // const teamsSect = $('.teams'); // append img to here
  const teamCard = $('<div>');
  teamCard.addClass('team-logo col text-center draggable');

  const pTag = $('<p>');
  pTag.text(team.name).addClass('fw-bold text-center').attr('id', 'team-name');

  const img = $('<img>');
  img.attr('src', team.logo).attr('alt', `${team.name} logo`).addClass('logos');
  img.attr('data-win-id', team.id);
  teamCard.append(img, pTag);
  // teamCard.appendTo(teamsSect);
  return teamCard;
  // getWinPercent()
}
// }


function renderTeam() {
  const teams = JSON.parse(localStorage.getItem('teamArray'));

  const teamsSect = $('.teams');
  teamsSect.empty();
  const compare1 = $('#compare-team1');
  compare1.empty();
  const compare2 = $('#compare-team2');
  compare2.empty()

  for (let team of teams) {
    if (team.status == 'teams') {
      createTeamCard(team).appendTo(teamsSect);
    } else if (team.status == 'compare-team1') {
      createTeamCard(team).appendTo(compare1);
    } else if (team.status == 'compare-team2') {
      createTeamCard(team).appendTo(compare2)
    }
  }

  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,

    // creates clone of card being dragged (visual only)
    helper: function (e) {
      // checks whether target of drag is card itself or child element. If card itself, clone it, else find parent card that is draggable and clone that.
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // returns clone with same width as original card
      return original
        .clone().css({
          width: original.outerWidth(),
        })
    },

  });
}

function handleDrop(event, ui) {
  const teams = JSON.parse(localStorage.getItem('teamArray'));
  const teamId = ui.draggable[0].dataset.winId;
  const newStatus = event.target.id;

  for (let team of teams) {
    if (team.id === teamId) {
      team.status = newStatus
    }
  }
}

// getTeamStats();

$(document).ready(function () {
  // renders tasks if there is any
  // createTeamCard();
  // renderTeam();
  // allows due date month/year to be changed with drop down menus
  $('#taskDueDate').datepicker({
    changeMonth: true,
    changeYear: true,
  });

  // makes lanes droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
});