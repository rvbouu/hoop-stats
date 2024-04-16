// JS file for what are the odds page
// taking two teams and compares overall win percent
// highlights winner in green
// shows both teams overall stats on sides
// at top: images for all teams that are drag/droppable
// reset button to clear out comparison square
// requestURL for individual teams :: http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/{team abbr}

const modal = $("#modal");
const modalError = $('#modal-error')
const teamsSect = $('#teams');
const teamOneStats = $('.team-one');
const teamTwoStats = $('.team-two');
const winner = $('#winner');
const compare1 = $('#compare-team1');
const compare2 = $('#compare-team2');
const teamsCompare = [];
let teams;

// Modal functions
function showModal(content){
  modal.append(content).css("display", "block")
}

function hideModal(){
  modal.html("").css("display", "none")
}

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

// gets teamArray data from localStorage
function readTeamsFromStorage() {
  let stringData = localStorage.getItem('teamArray');
  let teamArray = JSON.parse(stringData) || [];
  return teamArray;
}

// saves teamArray data to localStorage
function saveTeamsToStorage(teamArray) {
  let savedTeams = JSON.stringify(teamArray);
  localStorage.setItem('teamArray', savedTeams);
}

// uses data from sript.js fetch to get individual team stats and saves them to teamArray
function getTeamApi() {
  let teamArray = [];
  let savedData = readNBAFromStorage();
  // targets team array with NBA object in localStorage
  let teams = savedData.sports[0].leagues[0].teams;
  // saves teams array to localStorage under NBA Teams
  localStorage.setItem('NBA Teams', JSON.stringify(teams))
  // console.log(teams)
  for (let i = 0; i < teams.length; i++) {
    // fetching data for individual teams
    const requestURL = `http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${teams[i].team.abbreviation}`;
    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // creating object for individual teams
        const stats = data.team.record.items[0].stats;
        // getting specific data from fetched data and putting into an object
        // each team has their own object
        let team = {
          id: data.team.abbreviation,
          name: data.team.displayName,
          logo: data.team.logos[0].href,
          winPerc: data.team.record.items[0].stats[stats.length - 2].value,
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

// renders team logos at the top of the page
function renderAllLogos(){
  teams.forEach( team => {
    const id = team.id 
    teamsSect.append( createTeamCard(id) )
  })
}

// gets the id for dragged teams
function getStatsForTeam(teamId){
  return teams.find( team => team.id === teamId )
}
// creates team logo cards and returns it
function createTeamCard(teamId) {
  const team = getStatsForTeam(teamId)
  const teamCard = $('<div>');
  teamCard.addClass('team-logo col text-center draggable').attr('data-win-id', team.id);

  const pTag = $('<p>');
  pTag.text(team.name).addClass('fw-bold text-center').attr('id', 'team-name');

  const img = $('<img>');
  img.attr('src', team.logo).attr('alt', `${team.name} logo`).addClass('logos');
  teamCard.append(img, pTag);
  return teamCard;
}

// creates stats to be appended to asides
function createStats(teamId) {
  const team = getStatsForTeam(teamId);
  const stats = $('<div>');
  stats.addClass('team-stats col text-center');

  const title = $('<h3>');
  title.text(`${team.name} Stats`).addClass('border-bottom border-light mb-3');

  const overall = $('<p>');
  overall.text(`Overall Record: ${team.overall}`);

  const home = $('<p>');
  home.text(`Home Record: ${team.home}`);

  const away = $('<p>');
  away.text(`Away Record: ${team.away}`);

  stats.append(title, overall, home, away);
  return stats;
}

// renders team logo cards and makes them draggable
function renderTeam() {
  // const teams = readTeamsFromStorage('teamArray');

  // const teamsSect = $('#teams');
  // teamsSect.empty();
  // const compare1 = $('#compare-team1');
  // compare1.empty();
  // const compare2 = $('#compare-team2');
  // compare2.empty()

  // // for loop to change status of card when dragged to certain box
  // for (let team of teams) {
  //   if (team.status == 'teams') {
  //     createTeamCard(team).appendTo(teamsSect);
  //   } else if (team.status == 'compare-team1') {
  //     createTeamCard(team).appendTo(compare1);
  //   } else if (team.status == 'compare-team2') {
  //     createTeamCard(team).appendTo(compare2)
  //   }
  // }
  // makes cards draggable
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
      return original.clone().css({
        width: original.outerWidth(),
      })
    },
  });
}

// updates the display depending on where card is dragged and displays stats
function updateTeamDisplay(teamId){
  if(teamsCompare.length === 1){
    teamOneStats.append(createStats(teamId))
    compare1.append(createTeamCard(teamId))
  }else{
    teamTwoStats.append(createStats(teamId))
    compare2.append(createTeamCard(teamId))
    compareTeams();
  }
}

// handles drop of cards
function handleDrop(event, ui) {
  const winId = ui.draggable[0].dataset.winId;
  if( teamsCompare.find( team => team === winId) ) return false;

  if(teamsCompare.length < 2){
    teamsCompare.push(winId);
    updateTeamDisplay(winId)
  }else{
    showModal()
  }
}

// compares the teams that are dragged into compare boxes
function compareTeams(){
  const team1 = getStatsForTeam(teamsCompare[0]);
  const team2 = getStatsForTeam(teamsCompare[1]);

  // if statement to compare and show who would win between the two teams being compared
  if (team1.winPerc < team2.winPerc) {
    winner.text(`${team2.name} ➟ more likely to win.`);
  } else if (team2.winPerc < team1.winPerc) {
    winner.text(`${team1.name} ➟ more likely to win.`);
  } else if (team1.winPerc == team2.winPerc) {
    winner.text(`It'd be a tie.`);
  }
  // console.log('drop');
}

// load function that will render logos to screen and assign readTeamsFromStorage to teams variable
function load(){
  teams = readTeamsFromStorage();
  renderAllLogos();
}

// reset button
$('#reset').on('click', function (e) {
  document.location.href = './odds.html';
});

// error message button
modalError.on('click', function(e){
  e.preventDefault();
  document.location.href = './odds.html';
  hideModal();
});

// calls functions right when the page is ready and makes lanes droppable
$(document).ready(function () {
  getTeamApi();

  // makes lanes droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
});

load();