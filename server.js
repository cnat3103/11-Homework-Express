// Dependencies
// =============================================================
let express = require("express");
let path = require("path");
let fs = require("fs");

// Set up the Express App
// =============================================================
let app = express();
let PORT = process.env.PORT || 3000;

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/index.html"));
  });
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
require("./public/routes/apiRoutes")(app);
require("./public/routes/htmlRoutes")(app);

// Start the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
