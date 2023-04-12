var express = require('express');
var router = express.Router();

router.post('/login', (req, res) => {
  let newUserLogin = {
    userName: req.body.userName,
    userPassword: req.body.userPassword
  } 
  console.log('newUserLogin', newUserLogin);

  connection.connect((err) => {
    if (err) {
      console.log(err);
    } else {

      let sql = `
      SELECT * FROM users 
      WHERE userName = 
      ${connection.escape(newUserLogin.userName)} 
      AND userPassword = 
      ${connection.escape(newUserLogin.userPassword)}
      `;

      connection.query(sql, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log('userdata from query', data);
          res.json(data);
        }
      })
    }
  })
})

module.exports = router;
