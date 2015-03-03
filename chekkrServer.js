var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || 8888;

var urls_tysonkarl = [
"http://www.globyl.co",
"http://troup.mongohq.com:10075/nodejitsudb5496321227",
"http://pantry.iriscouch.com:6984", //https
"http://tt.iriscouch.com:6984", //https
"http://demo.mytimetrails.com",
"http://www.facebook.com/pages/Time-Trails/299220095031",
"http://www.everydaycounted.blogspot.com",
"http://timetrail.com",
"http://twitter.com/TimeTrails",
"http://guarded-basin-1356.herokuapp.com/",
"http://moringa.treesforlife.org/",
"http://globyl.blogspot.com/",
"http://timetrails.blogspot.com/",
"http://whooshup.blogspot.com/",
"http://ktys-agilecards.jit.su/agilecards.html",
"http://ktys-organon.jit.su/",
"http://timestore.jit.su/"   
];

var urls_tysonben = [
"http://www.tysontrek.com",
"http://www.globyl.co",
"http://mflip.com",
"http://www.betakillers.com",
"http://betakillers.com",
"http://www.bendianajones.com",
"http://www.tysonink.com",
"http://www.youtube.com/user/benjamintyson#p/a"
];

var urls;

var report_json = {};
report_json.report = [];
var target;


var body = '';
http.createServer(function(req, res){

    var urlsReq = req.url.substring(2);
    
    if(urlsReq.indexOf("tyson") >= 0) {
    
        switch(urlsReq) {
            case "tysonben": urls = urls_tysonben; break;
            case "tysonkarl": urls = urls_tysonkarl; break;  
            default: urls = urls_tysonben;
        }

        getResults( function() {

            setTimeout(function(){ 

                //console.log("yo" + JSON.stringify(report_json.report)); 
                    res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });


                    res.write(JSON.stringify(report_json.report));
                    res.end();

                    report_json.report = [];

                }, 

                10000);

        }); //getResults

    } else {
        //return resource
        var uri = url.parse(req.url).pathname;
        var filename = path.join(process.cwd(), uri);
        
        fs.exists(filename, function(exists) {
            if(!exists) {
              res.writeHead(404, {"Content-Type": "text/plain"});
              res.write("404 Not Found\n");
              res.end();
              return;
            }

            if (fs.statSync(filename).isDirectory()) filename += '/index.html';


            fs.readFile(filename, "binary", function(err, file) {
              if(err) {        
                res.writeHead(500, {"Content-Type": "text/html"});
                res.write(err + "\n");
                res.end();
                return;
              }

              res.writeHead(200);
              res.write(file, "binary");
              res.end();
            });
        });
        
    }
}).listen(port);

console.log("chekkr Server started on port " + port);



function getResults(callback) {
	for(var i = 0; i < urls.length; i++) {

		target = urls[i];
		getResult(target);
	
	}
	callback();
}


function getResult(target) {
	
	http.get(target, function(res) {
		if(res) {
		 	report_json.report.push({"target":target, "status":" Response: " + res.statusCode});
		} else {
			report_json.report.push({"target":target, "status":" No Response"});
		}


	}).on('error', function(e) {

	  	report_json.report.push({"target":target, "status":" Got error: " + e.message});

	});
}
	
	
	
