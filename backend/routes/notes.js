var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  
  connection.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      connection.query('SELECT * FROM notes', (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
          res.json(data);
        }
      })
    }
  })
});

router.post('/', (req, res) => {
  let newNote = req.body;
  console.log('newNote', newNote);

  connection.connect((err) => {
    if (err) {
      console.log(err);
    } else {

      let sql = `INSERT INTO notes (noteHeading, noteDescription, noteContent) VALUES ('${newNote.newNoteHeading}', '${newNote.newNoteDescription}', '${newNote.newNoteContent}')`;

      connection.query(sql, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log('saved new Note', data);
          res.json(data);
        }
      })
    }
  })
})

module.exports = router;
