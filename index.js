const http = require('http');
const URL = require('url');
const ping = require('ping');

const port = process.env.PORT || 81;

var httpSrv = http.createServer((req,res)=>{
	console.log("pong");

	//res.setHeader("Access-Control-Allow-Origin",'*');
    res.writeHead(200,{'Content-Type' : 'text/plain'});
	var ip = req.headers['x-forwarded-for'] || 
			     req.connection.remoteAddress || 
			     req.socket.remoteAddress ||
			     (req.connection.socket ? req.connection.socket.remoteAddress : null);
	try{
		ping.sys.probe(ip, function(isAlive){
	        var msg = isAlive ? 'host ' + ip + ' is alive' : 'host ' + ip + ' is dead';
	        console.log(msg);
	    });
	}catch(e){
		console.log(e);
	}
	res.write("got you covered");
	res.end();
})

httpSrv.listen(port);
console.log(`Listening on port ${port}`)