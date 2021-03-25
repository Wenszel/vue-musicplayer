const http = require("http");
const fs = require('fs');
const qs = require("querystring");
const url = require("url");
const server = http.createServer(function(req,res){

    switch (req.method) {
        case "GET": 
            var request = url.parse(req.url, true);
            var album = request.pathname;
            readCovers(req,res,album);
            break;
        case "POST":
            res.setHeader('Access-Control-Allow-Origin', '*');
            req.on("data", function (chunk) {

                let body = JSON.parse(chunk).body
                let {action, album} = body;

                if(action == 'albums'){
                    readAlbums(req, res);
                }else if(action == 'album'){
                    readAlbum(req,res,album);
                }
            })
            break;
    }

    function readCovers( req, res, album ){
        console.log(album);
        //console.log(`${__dirname}/static/mp3/${album}/cover.jpg`)
        fs.readFile(__dirname + album, function(error, content) {
            if (error) {
                res.writeHead(500);
                res.end();
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content, 'utf-8');
            }
        });
    }

    function readAlbum( req, res, album ){
        let location = `${__dirname}/static/mp3/${album}`
        responseObj = {
            album: album,
            files: [],
        };
        fs.readdir(location , function (err, files) {
            if (err) {
                return console.log(err);
            }
            files.forEach( file => {
                var stats = fs.statSync(`${location}/${file}`);
                responseObj['files'].push({file: file, size: stats.size})
            });  
            res.writeHead(200, {'Content-Type':'application/json;charset=UTF-8'});
            res.end(JSON.stringify(responseObj));  
        });    
    }

    function readAlbums( req, res ) {
        let responseObj = {
            dirs: [],
            files: [],
        }
        fs.readdir(__dirname + '/static/mp3', function (err, files) {
            if (err) {
                return console.log(err);
            }
            files.forEach( file => {
                responseObj['dirs'].push(file)
            });
            fs.readdir(`${__dirname}/static/mp3/${responseObj['dirs'][0]}`, function (err, files) {
                if (err) {
                    return console.log(err);
                }
                files.forEach( file => {
                    var stats = fs.statSync(`${__dirname}/static/mp3/${responseObj['dirs'][0]}/${file}`);
                    responseObj['files'].push({file: file, size: stats.size})
                });  
                
                res.writeHead(200, {'Content-Type':'application/json;charset=UTF-8'});
                res.end(JSON.stringify(responseObj));  
            });        
        });
    }
});

server.listen(3000, ()=>{console.log("Server launched")})
