//variable
var searchData = 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2022-04-08/2022-04-08?adjusted=true&sort=asc&limit=120&apiKey=jVeWqQOEafgJX73FKFxxBZJ0M5RtPnp6';

// let polyApiKey = "jVeWqQOEafgJX73FKFxxBZJ0M5RtPnp6";

function polyData(request) {
      fetch(searchData)
        .then(function(res) {
            console.log(res);
            return res.json()
        })
        .then(function(data){
            console.log(data);
        });
    }

    polyData(searchData);


