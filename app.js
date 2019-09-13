var http = require('http');
var url = require('url');

// const getRequestOption = (request) => {
//     let opt = '';

//     if (request && request.url && request.url.length > 2) {
//         let url = request.url;
//         if (url[0] === '/') {
//             url = url.slice(1);
//         }

//         let urlList = url.split('?');

//         for (let u of urlList) {
//             let idx = u.indexOf('option='); 
//             if (idx !== -1) {
//                 opt = u.substring(idx + 7);
//                 break;
//             }
//         }
//     }

//     return opt;
// };

const getOptions = (option) => {
    let opt = null;
    let results = [];

    switch(option) {
        case '1':
            opt = {
                name: 'option1',
                type: 'type1',
                c: 'ES',
                tz: 'GMT+1',
                lon: '2',
                lat: '1'
            };
            break;
        default:
            break;
    }

    if (opt) {
        results.push(opt);
    }

    return results;
}

let getLatLonData = (lat, lon) => {
    let result = {};

    if (lat === '1' && lon === '2') {
        result = {
            coord: {
                lat: lat,
                lon: lon
            },
            data: {
                temp: 25,
                tempMin: 18,
                tempMax: 29
            }
        };
    }

    return result;
}

const server = http.createServer((request, response) => {
    let result = {};

    let q = url.parse(request.url, true);
    let path = q.pathname;

    switch(path) {
        case '/api1/options':
            let option = q.query.option || null;
            
            result = {
                powerdBy: "nodeJS-Test",
                Results: getOptions(option)
            };

            break;

        case '/api2/data':
            let lat = q.query.lat;
            let lon = q.query.lon;
            
            result = getLatLonData(lat, lon);

            break;
    }

    response.writeHead(200, {"Content-Type": "application/json"});
    response.end(JSON.stringify(result));
});

server.listen(8000);