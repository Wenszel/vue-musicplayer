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
                if(action === 'first'){
                    readAlbums(req, res);
                }else if(action === 'second'){

                }else{
                    
                }
            })
            break;
    }
    function readAlbums(req, res) {
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
                    responseObj['files'].push(file)
                });  
                res.writeHead(200, {'Content-Type':'application/json;charset=UTF-8'});
                res.end(JSON.stringify(responseObj));  
            });        
        });
    }
});

server.listen(3000, ()=>{console.log("Server launched")})
