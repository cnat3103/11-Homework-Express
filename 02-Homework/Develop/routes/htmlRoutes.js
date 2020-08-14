// ======================================================
// DEPENDENCIES
// ======================================================

const path = require("path");
// const fs = require("fs");

// ======================================================
// DEPENDENCIES
// ======================================================

module.exports = (app) => {
// Basic route that sends the user first to the AJAX Page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};