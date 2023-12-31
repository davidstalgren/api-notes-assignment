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

router.get('/:id', (req, res) => {
  
  let noteIdToGet = req.params.id;

  connection.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      connection.query(`SELECT * FROM notes WHERE noteId = ${noteIdToGet}`, (err, data) => {
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

      let sql = `INSERT INTO notes 
        (noteHeading, noteDescription, noteContent) 
        VALUES (?, ?, ?)`;
      
      let values = [
        newNote.newNoteHeading, 
        newNote.newNoteDescription, 
        newNote.newNoteContent
      ];

      connection.query(sql, values, (err, data) => {
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

router.post('/update/:id', (req, res) => {
  let editedNote = req.body;
  console.log('edited', editedNote);

  connection.connect((err) => {
    if (err) {
      console.log(err);
    } else {

      let sql = `UPDATE notes SET 
        noteHeading = ?,
        noteDescription = ?,
        noteContent = ?
        WHERE noteId = ?`;
    
      let values = [
        editedNote.editedNoteHeading, 
        editedNote.editedNoteDescription, 
        editedNote.editedNoteContent, 
        req.params.id
      ];

      connection.query(sql, values, (err, data) => {
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
