const REST_SERVER='https://cors-anywhere.herokuapp.com/https://api-ratp.pierre-grimaud.fr/v4';

window.lines={metros:[],tramways:[],rers:[],buses:[],noctiliens:[]};
window.transportType=['metros','tramways','rers','buses','noctiliens'];

//recuperation de tout le parc de lignes
function getAllLines(params) {

    transportType.forEach(type => {
        (new RestCrud(REST_SERVER)).get(lines=>{
            lines.forEach(line=>{
                getStations(e=>console.log(e),type,line.code)
            })
        },'/lines/'+type);    
    });
}

function getSchedules(type,line,station, ar='R')
{
    (new RestCrud(REST_SERVER)).get(e=>{console.log(e)},'/schedules/'+type,line+'/'+station+'/'+ar);   
}
getSchedules('metros','1','la+defense+(grande+arche)','A')