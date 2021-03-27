const http = require("http");
const fs = require('fs');
const qs = require("querystring");
const url = require("url");
const server = http.createServer(function(req,res){

    switch (req.method) {
        case "GET": 
            if(req.url.indexOf(".jpg") != -1){
                    fs.readFile(__dirname + decodeURI(req.url), function(error, content) {
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
            else if (req.url.indexOf(".mp3") != -1) {
                fs.readFile(__dirname + decodeURI(req.url), function (error, data) {
                    var stats = fs.statSync(__dirname + decodeURI(req.url));
                    res.writeHead(200, { 
                        "Content-type": "audio/mpeg",
                        "Content-Length": stats.size,
                        "Accept-Ranges": "bytes" 
                    });
                   res.write(data);
                   res.end();
                })
             }
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

    function readAlbum( req, res, album ){
        console.log(album);
        let location = `${__dirname}/static/mp3/${album.album}`
        responseObj = {
            album: album,
            files: [],
        };
        fs.readdir(location , function (err, files) {
            if (err) {
                return console.log(err);
            }
            files.forEach( file => {
                if(file.indexOf('.mp3') != -1){
                    var stats = fs.statSync(`${location}/${file}`);
                    responseObj['files'].push({
                        file: file, 
                        size: bytesToSize(stats.size)
                    })
                }  
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
                    if(file.indexOf('.mp3') != -1){
                        var stats = fs.statSync(`${__dirname}/static/mp3/${responseObj['dirs'][0]}/${file}`);
                        responseObj['files'].push({file: file, size: bytesToSize(stats.size)})
                    }
                });  
                
                res.writeHead(200, {'Content-Type':'application/json;charset=UTF-8'});
                res.end(JSON.stringify(responseObj));  
            });        
        });
    }
});

//Coverts Bytes to different unit prefix based on file size
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 }

server.listen(3000, ()=>{console.log("Server launched")})
