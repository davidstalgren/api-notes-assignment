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

          if (data.length > 0) {

            if (data[0].userPassword == newUserLogin.userPassword) {

              res.status(200).json({ 
                message: 'Login successfull',
                access: true,
                user: data[0].userName, 
                id: data[0].userId })
              } else {

                res.status(401).json({ 
                  message: 'Invalid username or password',
                  access: false
                });
              }
            } else {
              
              res.status(401).json({ 
                message: 'Invalid username or password',
                access: false 
              });
            }
        }
      })
    }
  })
})

module.exports = router;