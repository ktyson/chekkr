var http = require("http");

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
"http://whooshup.blogspot.com/"
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

    
}).listen(8000);

console.log("chekkr Server started");



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
	
	
	
