const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PageSchema = new Schema({
  name: String,
  url: String,
  title: String,
  description: String,
  language: String,
  html: String,
  scripts: [String],
  template: String
});

module.exports = mongoose.model("Pages", PageSchema); // elle accepte de nouvelle entrées que si l'objet passé // en param respecte le schema
