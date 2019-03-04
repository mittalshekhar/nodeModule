const md5 = require('md5');
const validate = require('node-input-validator');
const con = require('./connection');

exports.login = function(req,res){
  let validator = new validate(req.body, {
    email: 'required|email',
    password: 'required|minLength:6|maxLength:25'
});

validator.check().then(function (matched) {
    if(!matched)
    {
      res.render('home', {
        error: validator.errors,
        email: req.body.email.trim(),
        password: req.body.password.trim()
      });
    }
    else
    {
        ////////////////////////////////////
        var email= req.body.email;
        var password = req.body.password;
        con.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
        if (error) {
          res.render('home', {
            email: req.body.email.trim(),
            password: '',
            thanks_msg : error
          });
        }else{
          // console.log('The solution is: ', results);
          if(results.length >0){
            if(results[0].password == md5(password)){
              /*res.send({
                "code":200,
                "success":"login sucessfull"
                  });*/
                  req.session.user_id = results[0].id;
                  res.redirect('/');
            }
            else{
              res.render('home', {
                email: req.body.email.trim(),
                password: '',
                thanks_msg : 'Incorrect password'
              });
            }
          }
          else{
            res.render('home', {
              email: req.body.email.trim(),
              password: '',
              thanks_msg : 'Email doesn\'t exist'
            });
          }
        }
        ///////////////////////////////////
      });
    }
});
};