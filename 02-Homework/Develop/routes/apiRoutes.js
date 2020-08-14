
// ======================================================
// DEPENDENCIES
// ======================================================

const { v4: uuidv4 } = require('uuid');
const fs = require ("fs");




// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

    // API POST Requests
  
    // ---------------------------------------------------------------------------
  
    // Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
    app.post("/api/notes", function(req, res) {
        var newNote = req.body;
        newNote.id = uuidv4();
          fs.readFile("../db/db.json", "utf8", function(error,data) {
            var data = JSON.parse(data); 
            data.push(newNote);
            fs.writeFile("../db/db.json", JSON.stringify(data), function(error){
              if (error)
               throw error;
               console.log("Written Successfully");
            })
          });
          res.json(newNote);
    
        });

    // API GET Requests
  
     // /api/notes should read the db.json file and return all saved notes as JSON
    app.get('/api/notes', function (req, res) {
      fs.readFile("../db/db.json", "utf8", function(error,data) {
        res.json(JSON.parse(data));
      });
      
    });
  
    
  
    // NEED DELETE
    //   app.delete("/api/notes/:id", function(req, res) {
    //     fs.readFile("../db/db.json", "utf8", function(error, data) {
    //       let noteId = req.params.id;
    //       let noteData = JSON.parse(data);
    //       ??
    //     });
  
    //   });
  
  };
