// const REST_SERVER='https://cors-anywhere.herokuapp.com/https://api-ratp.pierre-grimaud.fr/v4';
const REST_SERVER = 'http://2d81ac2d5f1c.ngrok.io';
const MA_STATION = 'la+defense+(grande+arche)';
window.lines = { metros: [], tramways: [], rers: [], buses: [], noctiliens: [] };
window.transportType = ['metros'];//,'tramways','rers','buses','noctiliens'];

//recuperation de tout le parc de lignes
function getAllLines(params) {

    transportType.forEach(type => {
        (new RestCrud(REST_SERVER)).get(lines => {
            lines.forEach(line => {
                getStations(stations => {
                    var arrayStationFound = stations.find(station => { if (station.slug == MA_STATION) return true; })

                    if (arrayStationFound.length) window.lines.metros.push(line);
                }, type, line.code)
            })
        }, '/lines/' + type);
    });
}

function getSchedules(type, line, station, ar = 'R') {
    var ressourceUrl = '/schedules_' + type + '_' + line + '_' + station + '_' + ar;
    //creation de la div.line-schedule
    //ajout du code de la ligne
    var lineSchedules=document.createElement('div');
    lineSchedules.classList.add('line-schedule');
    var lineCode=document.createElement('div');
    lineCode.classList.add('line-code');
    lineCode.innerHTML='${type}:${line}';
    lineSchedules.append(lineCode);     
    (new RestCrud(REST_SERVER)).get(e => {
        console.log(e)
        e.result.schedules.forEach(e => {
            //dans la div.line-schedule --> append le nouvel horaire
            var schedule=document.createElement('div');
            schedule.classList.add('schedule');
            schedule.innerHTML='${destination}:${message}';
            lineSchedules.append(schedule);
        });
        document.querySelector('#schedules').append(lineSchedules);
    }, ressourceUrl);
}
getSchedules('rers', 'a', 'defense', 'R')
getSchedules('metros', '1', 'defense', 'R')