const http = require('http');
const URL = require('url');
const ping = require('ping');

const port = process.env.PORT || 81;

var httpSrv = http.createServer((req,res)=>{
	console.log("pong");
	var query = URL.parse(req.url,true).query;
 	res.writeHead(200,{'Content-Type' : 'text/plain'});
 	res.write("got you covered");
	res.end();
	
	if(query.hi == "true"){
		pingPong("heroku-for-me.herokuapp.com");
	}
	//res.setHeader("Access-Control-Allow-Origin",'*');
   
    //console.log(URL.parse(req.url,true));
	
})

httpSrv.listen(port);
console.log(`Listening on port ${port}`)

function pingPong(ping_reciever){
	var options = {
		host:ping_reciever,
		path:"/?hi=true",
		port:"80",
		method:"GET"
	}
	//console.log("req");
	var str = "";
	var req = http.request(options,(response)=>{
		response.on('data', function (chunk) {
		    str += chunk;
		});
	    //the whole response has been received, so we just print it out here
	    response.on('end', function () {
	       //console.log(str);
	    });
	});
	req.on('error',(err)=>{
		console.log(`Couldn't req with error ${err}`)
	})
	req.end();
}