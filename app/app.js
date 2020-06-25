// const REST_SERVER='https://cors-anywhere.herokuapp.com/https://api-ratp.pierre-grimaud.fr/v4';
const REST_SERVER='http://localhost:5000';
const MA_STATION='la+defense+(grande+arche)';
window.lines={metros:[],tramways:[],rers:[],buses:[],noctiliens:[]};
window.transportType=['metros'];//,'tramways','rers','buses','noctiliens'];

//recuperation de tout le parc de lignes
function getAllLines(params) {

    transportType.forEach(type => {
        (new RestCrud(REST_SERVER)).get(lines=>{
            lines.forEach(line=>{
                getStations(stations=>{
                   var arrayStationFound= stations.find(station=>{if(station.slug==MA_STATION)return true;})
                    
                   if(arrayStationFound.length)window.lines.metros.push(line);
                },type,line.code)
            })
        },'/lines/'+type);    
    });
}

function getSchedules(type,line,station, ar='R')
{
    var ressourceUrl='/schedules_'+type+'_'+line+'_'+station+'_'+ar;
    // console.log(REST_SERVER+ressourceUrl)
    (new RestCrud(REST_SERVER)).get(e=>{},ressourceUrl);   
}
getSchedules('rers','a','defense','R')