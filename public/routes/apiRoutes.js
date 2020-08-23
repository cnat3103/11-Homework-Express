
// ======================================================
// DEPENDENCIES
// ======================================================

const path = require("path");
const fs = require("fs");
const db = path.join(__dirname, "../../db/db.json");

// ===============================================================================
// ROUTES
// ===============================================================================

module.exports = function(app) {

app.get("/api/notes", function(req, res) {
  fs.readFile(db, "utf-8", function(err, data){
    if (err) throw err;
    let dataJ = JSON.parse(data);
    return res.json(dataJ);
  });
});


app.post("/api/notes", function(req, res) {
    // New id needs to be assigned as a note from client comes without id. 
    let note = req.body;    
    let data = fs.readFileSync(db, "utf-8");
    let dataJ = JSON.parse(data);
    note.id = getNewId(dataJ);
    dataJ.push(note);
    
    fs.writeFile(db, JSON.stringify(dataJ), function(err) {
      if (err) { 
        throw err;
        res.json(false);
      }
      res.json(true);
    })

});

// Get largest ID and plus 1
function getNewId(notes){
  let maxId = 0;
  for (let i=0; i<notes.length; i++){
    if (notes[i].id > maxId) {
      maxId = notes[i].id;
    }     
  }
  maxId++;
  return maxId;
}

app.delete("/api/notes/:id", function(req, res) {
    let id = req.params.id;
    let data = fs.readFileSync(db, "utf-8");
    let dataJ = JSON.parse(data);
    for (let i=0; i<dataJ.length; i++){
        if (dataJ[i].id == id){
            // If ID is found
            dataJ.splice(i, 1)
            console.log(dataJ);
            fs.writeFileSync(db, JSON.stringify(dataJ));
            return res.json(true);            
        } 
    }
    // if ID is not found
    return res.status(404).json(false);
  });
};
