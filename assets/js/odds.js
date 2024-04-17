// JS file for what are the odds page
// taking two teams and compares overall win percent
// highlights winner in green
// shows both teams overall stats on sides
// at top: images for all teams that are drag/droppable
// reset button to clear out comparison square
// requestURL for individual teams :: http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/{team abbr}

const modal = $("#modal");
const teamsSect = $('#teams');
const teamOneStats = $('.team-one');
const teamTwoStats = $('.team-two');
const winner = $('#winner');
const compare1 = $('#compare-team1');
const compare2 = $('#compare-team2');

let teams;
let league = 'NBA';
const teamsBeingCompared = [];

const apis = [
  {
    league: 'NBA',
    getTeams: function(abbreviation){
      return `http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${abbreviation}`
    }
  }
]

function load(){
  teams = readTeamsFromStorage();
  renderAllLogos()
}


function renderAllLogos(){
  teams.forEach( team => {
    const id = team.id 
    teamsSect.append( createTeamCard(id) )
  })
}


// gets NBA data from localStorage
function readSportsTeams(league) {
  let stringData = localStorage.getItem(league);
  let data = JSON.parse(stringData) || [];
  return data;
}

// saves NBA data to localStorage
function saveTeamsToStorage(data, key = league) {
  localStorage.setItem(key, JSON.stringify(data));
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

function getStatsForTeam(teamId){
  return teams.find( team => team.id === teamId )
}

// uses data from sript.js fetch to get individual team stats and saves them to teamArray
function getTeamApi() {
  let teamArray = [];
  let savedData = readSportsTeams(league);
  // targets team array with NBA object in localStorage
  let teams = savedData.sports[0].leagues[0].teams;
  // saves teams array to localStorage under NBA Teams
  localStorage.setItem(`${league} Teams`, JSON.stringify(teams))
  // console.log(teams)
  for (let i = 0; i < teams.length; i++) {
    // fetching data for individual teams
    const apiObj = apis.find( api => api.league === league )
    const reqUrl = apiObj.getTeams(teams[i].team.abbreviation)


    // const requestURL = `http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${teams[i].team.abbreviation}`;
    fetch(reqUrl)
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

// creates team logo cards and returns it
function createTeamCard(teamId) {
  const teamObj = getStatsForTeam(teamId)

  const teamCard = $('<div>');
  teamCard.addClass('team-logo col text-center draggable').attr('data-win-id', teamObj.id);

  const pTag = $('<p>');
  pTag.text(teamObj.name).addClass('fw-bold text-center').attr('id', 'team-name');

  const img = $('<img>');
  img.attr('src', teamObj.logo).attr('alt', `${teamObj.name} logo`).addClass('logos');
  teamCard.append(img, pTag);
  return teamCard;
}

// creates stats to be appended to asides
function createStats(teamId) {
  const team = getStatsForTeam(teamId)

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

function showModal(content){
  modal.append(content).css("display", "block")
}

function hideModal(){
  modal.html("").css("display", "none")
}

// renders team logo cards and makes them draggable
function renderTeam() {
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

function updateTeamDisplay(teamId, draggedFromArea){
  if( teamsBeingCompared.length === 1 ){
    teamOneStats.append(createStats(teamId))
    compare1.append(createTeamCard(teamId))
  } else {
    teamTwoStats.append(createStats(teamId))
    compare2.append(createTeamCard(teamId))
    compareTeams();
  }
}

// handles drop of cards
function handleDrop(event, ui) {
  const winId = ui.draggable[0].dataset.winId;
  if( teamsBeingCompared.find( team => team === winId) ) return false;

  console.log("drop");

  if( teamsBeingCompared.length < 2 ){
    teamsBeingCompared.push(winId)
    updateTeamDisplay(winId, event.target.id)
  } 
  // renderTeam();
}

function compareTeams(){
  const team1 = getStatsForTeam(teamsBeingCompared[0])
  const team2 = getStatsForTeam(teamsBeingCompared[1])

  // if statement to compare and show who would win between the two teams being compared
  if (team1.winPerc < team2.winPerc) {
    winner.text(`${team2.name} ➟ more likely to win.`);
  } else if (team2.winPerc < team1.winPerc) {
    winner.text(`${team1.name} ➟ more likely to win.`);
  } else if (team1.winPerc == team2.winPerc) {
    winner.text(`It'd be a tie.`);
  }
  console.log('drop');
  // saveTeamsToStorage(teams);

}

// reset button
$('#reset').on('click', function (e) {
  document.location.href = './odds.html';
});

// calls functions right when the page is ready and makes lanes droppable
$(document).ready(function () {
  // renders tasks if there is any
  getTeamApi();

  // makes lanes droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
});

load();
