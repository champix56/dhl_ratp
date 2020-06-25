// const REST_SERVER='https://cors-anywhere.herokuapp.com/https://api-ratp.pierre-grimaud.fr/v4';
const REST_SERVER = 'http://localhost:5000';
const MA_STATION = 'chatelet';
window.lines = { metros: [], tramways: [], rers: [], buses: [], noctiliens: [] };
window.transportType = ['metros','rers'];//,'tramways','rers','buses','noctiliens'];

//recuperation de tout le parc de lignes
function getAllLines() {

    transportType.forEach(type => {
        (new RestCrud(REST_SERVER)).get(lines => {
            lines.result[type].forEach(line => {
                getStations(stations => {
                    if (stations.result == undefined) return;
                    var arrayStationFound = stations.result.stations.find(station => {
                        if (station.slug == MA_STATION) return true;
                    })

                    if (arrayStationFound!=undefined) {
                        window.lines[type].push(line);
                        var lineDOM = document.createElement('div');
                        var imgAdr = '/img/';
                        switch (type) {
                            case 'metros': imgAdr += 'M'; break;
                            case 'tramways': imgAdr += 'T'; break;
                            case 'noctiliens': imgAdr += 'Noct-'; break;
                            case 'rers': imgAdr += 'RER'; break;
                            default: break;
                        }
                        imgAdr += line.code + 'genRVB.svg';

                        lineDOM.innerHTML = '<img src="' + imgAdr + '" alt="' + line.code + '"/>';

                        document.querySelector('#lignes').append(lineDOM);
                    }
                }, type, line.code)
            })
        }, '/lines_' + type);
    });
}
function getStations(callback, type, line) {
    (new RestCrud(REST_SERVER)).get(callback, '/stations_' + type + '_' + line);
}
function getSchedules(type, line, station, ar = 'R') {
    var ressourceUrl = '/schedules_' + type + '_' + line + '_' + station + '_' + ar;
    //creation de la div.line-schedule
    //ajout du code de la ligne
    var lineSchedules = document.createElement('div');
    lineSchedules.classList.add('line-schedule');
    var lineCode = document.createElement('div');
    lineCode.classList.add('line-code');
    // lineCode.innerHTML='${type}:${line}';
    var imgAdr = '/img/';
    switch (type) {
        case 'metros': imgAdr += 'M'; break;
        case 'tramways': imgAdr += 'T'; break;
        case 'noctiliens': imgAdr += 'Noct-'; break;
        case 'rers': imgAdr += 'RER'; break;
        default: break;
    }
    imgAdr += line + 'genRVB.svg';

    lineCode.innerHTML = '<img src="' + imgAdr + '" class="logo-line"/>';
    lineSchedules.append(lineCode);
    (new RestCrud(REST_SERVER)).get(e => {
        console.log(e)
        e.result.schedules.forEach(aSchedule => {
            //dans la div.line-schedule --> append le nouvel horaire
            var schedule = document.createElement('div');
            schedule.classList.add('schedule');
            // schedule.innerHTML='${aSchedule.destination}:${aSchedule.message}';
            schedule.innerHTML = aSchedule.destination + '->' + aSchedule.message;
            lineSchedules.append(schedule);
        });
        document.querySelector('#schedules').append(lineSchedules);
    }, ressourceUrl);
}
getAllLines()
getSchedules('rers', 'b', MA_STATION, 'R')
getSchedules('metros', '1', MA_STATION, 'R')