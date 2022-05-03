const express = require('express');
const path = require('path');
const fs = require("fs")
//const api = require('./routes/index.js');

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api', api);

app.use(express.static('public'));
app.get('/api/notes', (req, res) => {
  fs.readFile("lib/db/db.json", "utf-8", (error, data) => {
    if (error) {
      console.log(error)
    }
    res.json(JSON.parse(data))
  })
})
app.post('/api/notes', (req, res) => {
  fs.readFile("lib/db/db.json", "utf-8", (error, data) => {
    if (error) {
      console.log(error)
    }
    //create new note
    const newNote = req.body
    const notes = JSON.parse(data)
    notes.push(newNote)
    fs.writeFile("lib/db/db.json", JSON.stringify(notes), (err)=>{
      res.json(newNote)
    })
  })
}
);


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

