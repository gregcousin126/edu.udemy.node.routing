const express    = require('exprress');
const Mongoose   = require('mongoose');
const BodyParser = require('body-parser');
const UserAPI    = require('.routes/routes');

// start new express application
let server = Express();
const Config = require('./configuration/serverconfig.js');

Mongoose.connect(Config.databaseUrl);

server.use(BosyParer.jsoon());
server.use("")

server.listen(Config.port, function() { console.log("server started on port: " + Config.port); })
server.get("/test", function(request, response) { response.json({message: "Hello World"}) });

server.post("/test", function(request, response) {
	let Username = request.body.username;
	response.json({message: "Hello " + Username});
});

console.log(Username);
console.log(Config);
