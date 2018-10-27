const Mongoose = require('mongoose') 
let UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    unique: true
  }
});

module.exports = Mongoose.model("User", UserSchema);