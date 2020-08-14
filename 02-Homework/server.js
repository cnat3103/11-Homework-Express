// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");


// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public/'));
// require("./Develop/routes/apiRoutes")(app);
require("./Develop/routes/htmlRoutes")(app);

   
// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});