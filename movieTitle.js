var https = require('https');

function fetchData(substr) {
    let titleArray = [];
    let url = 'https://jsonmock.hackerrank.com/api/movies/search/?Title=' + substr;
    https.get(url, (res) => {
        res.setEncoding('utf8');
        res.on('data', function(body) {
            let dataRec = JSON.parse(body);
            let movies = dataRec.data;
            let totPages = dataRec.total_pages;
            let titleArray = [];
            movies.map((a) => {
              titleArray.push(a.Title)
            })
            for (let i = 2; i <= totPages; i++) {
                let newPage = i;
                let url1 = 'https://jsonmock.hackerrank.com/api/movies/search/?Title=' + substr + "&page=" + newPage;
                https.get(url1, (res) => {
                    res.setEncoding('utf8');
                    res.on('data', function(body) {
                        let newData = JSON.parse(body);
                        let newMovies = newData.data;
                        for (let i = 0; i < newMovies.length; i++) {
                            titleArray.push(newMovies[i].Title);
                        }
                        let sortArray = titleArray.sort();
                        sortArray.forEach(function(value){
                            console.log(value);
                        });
                    })
                })
            }
        })
    })
}

//primary function 
function getMovieTitles(substr) {
    fetchData(substr);
}

getMovieTitles("spiderman");