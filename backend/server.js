const http = require("http");
const fs = require('fs');
const formidable = require('formidable');
const PORT = process.env.PORT || 3000;
const db = require(__dirname + "/database/db-methods.js");


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
             
             else if(req.url === '/admin'){
                fs.readFile(__dirname + '/static/admin.html', function (error, html) {
                    res.writeHeader(200, {"Content-Type": "text/html"});  
                    res.write(html);  
                    res.end();  
                })
             }
            break;
        case "POST":
            if(req.url === '/'){
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.writeHead(200, {'Content-Type':'application/json;charset=UTF-8'});
                req.on("data", async function (chunk) {
                    let body = JSON.parse(chunk).body
                    let {action, album, file, size} = body;
                    if(action === 'allAlbums'){
                        readAlbums(req, res);
                    }else if(action ==='specificAlbum'){
                        readAlbum(req, res, album);
                    }else if(action === 'likeSong'){
                        let isLiked = await db.find(file, album);
                        isLiked ? db.delete(file, album) : db.insert(file, album, size);
                        res.end(JSON.stringify({isLiked: isLiked}));  
                    }else if(action === 'likedSongs'){
                        let resObj = await db.findAll();
                        resObj.forEach( file => file['isLiked'] = true);
                        res.end(JSON.stringify(resObj));
                    }
                })
            }else if( req.url === '/upload'){
                var dir = `${__dirname}/static/mp3/${Math.floor(Math.random()*100000)}/`;

                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                let form = formidable({})
                form.uploadDir = dir;
                form.multiples = true;
                form.parse(req, function (err, fields, files) {
                    if(Array.isArray(files.file)){
                        files.file.forEach((file)=>{
                            if(file.name.indexOf('.mp3') != -1){
                                fs.rename(file.path, dir + file.name, function (err) {
                                    if(err) console.log(err)
                                 });
                            }else{
                                fs.rename(file.path, dir + 'cover.jpg', function (err) {
                                    if(err) console.log(err)
                                 });
                            }
                            
                        })
                    } 
                 });
            }
            break;
    }

    function readAlbum( req, res, album ){
        let location = `${__dirname}/static/mp3/${album}`
        resObj = {
            album: album,
            files: [],
        };
        fs.readdir(location , async function (err, files) {
            if (err) {
                return console.log(err);
            }
            for(const file of files){
                // Checks is file mp3 format
                if(file.indexOf('.mp3') != -1){
                    // Gets file size
                    var stats = fs.statSync(`${location}/${file}`);
                    resObj['files'].push({
                        file: file, 
                        album: album,
                        isLiked: await db.find(file, album),
                        size: bytesToSize(stats.size)
                    })
                }  
            }
            res.end(JSON.stringify(resObj));  
        });    
    }
    function readAlbums( req, res ) {
        let resObj = {
            dirs: [],
            files: [],
        }
        fs.readdir(__dirname + '/static/mp3', function (err, files) {
            if (err) {
                return console.log(err);
            }
            files.forEach( file => {
                resObj['dirs'].push(file)
            });
            fs.readdir(`${__dirname}/static/mp3/${resObj['dirs'][0]}`, async function (err, files) {
                if (err) {
                    return console.log(err);
                }
                for(const file of files){
                    if(file.indexOf('.mp3') != -1){
                        var stats = fs.statSync(`${__dirname}/static/mp3/${resObj['dirs'][0]}/${file}`);
                        resObj['files'].push({
                            file: file, 
                            isLiked: await db.find(file, resObj['dirs'][0]),
                            album: resObj['dirs'][0],
                            size: bytesToSize(stats.size)
                        })
                    }
                }
                res.end(JSON.stringify(resObj));  
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

server.listen(PORT, () => { console.log(`Server is started at port: ${PORT}`) });
