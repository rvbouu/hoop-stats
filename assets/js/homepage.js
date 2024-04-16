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

function scheduleAPI() {
  const requestURL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard';

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      let schedule = []
      let events = data.events
      console.log(events);

      
      for (let i = 0; i < events.length; i++) {
        let event = {
          date: events[i].status.type.detail,
          name: events[i].name,
          description: events[i].status.type.description,
          clock: events[i].status.clock,
          period: events[i].status.period,
    } 
    schedule.push(event);
  }
      console.log(schedule);
      for (let i = 0; i <schedule.length; i++) {
        let sidebar = $(".sidebar");
        let div = $('<div>');
        div.appendTo(sidebar);
        let name = $('<h3>');
        name.text(`${schedule[i].name}`).appendTo(div);
        let date = $('<h4>');
        date.text(`${schedule[i].date}`).appendTo(div);
        let period = $('<p>');
        period.text(`Period: ${schedule[i].period}`).appendTo(div);
        let clock = $('<p>');
        clock.text(`Clock: ${schedule[i].clock}`).appendTo(div);
        let description = $('<p>');
        description.text(`${schedule[i].description}`).appendTo(div);
        // div.appendTo(sidebar);
      }
    
  })

}

scheduleAPI();