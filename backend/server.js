const http = require("http");
const fs = require('fs');
const qs = require("querystring");

const server = http.createServer(function(req,res){
    switch (req.method) {
        case "GET": 
            break;
        case "POST":
            req.on("data", function (chunk) {
                let action = JSON.parse(chunk).action;
                let album = JSON.parse(chunk).album;
                if(action === 'albums'){
                    readAlbums(req, res);
                }else if(action === 'album'){
                    readAlbum(req,res,album);
                }else if(action === 'covers'){
                    readCovers(req,res, album);
                }
            })
            break;
    }
    function readCovers( req, res, album ){
        var img = fs.readFileSync(`${__dirname}/static/covers/${album}/cover.jpg`);
        res.writeHead(200, {'Content-Type': 'image/jpg' });
        res.end(img, 'binary');
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
