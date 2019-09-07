const Express = require("express");
const User    = require('../models/user-model');
let   Server  = Express.Router();

Server.post("/user", function(request, response){
  let UserDetails = request.body;
  
  
  let NewUser = new User({
    name : UserDetails.name,
    age  : UserDetails.age,
    email: UserDetails.emial
  });

  NewUser.save(function(error, user){
    if (error)
    response.json({message: "Could not create user", error:error});
    
    else
    response.json({message: "Created user", user: user});
  });
});

module.exports = Server;