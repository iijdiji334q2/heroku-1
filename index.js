const http = require('http');
const URL = require('url');
const ping = require('ping');

const port = process.env.PORT || 81;

var httpSrv = http.createServer((req,res)=>{
	console.log("pong");
	console.log(req.url);
	//res.setHeader("Access-Control-Allow-Origin",'*');
    res.writeHead(200,{'Content-Type' : 'text/plain'});
    //console.log(URL.parse(req.url,true));
	res.write("got you covered");
	res.end();
})

httpSrv.listen(port);
console.log(`Listening on port ${port}`)