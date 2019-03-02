const md5 = require('md5');
const validate = require('node-input-validator');
const connection = require('./connection');

exports.register = function(req,res){

  let validator = new validate(req.body, {
      fname: 'required|alpha|minLength:3',
      lname: 'required|alpha|minLength:3',
      mobile: 'required|phoneNumber|minLength:10|maxLength:10',
      email: 'required|email',
      password: 'required|minLength:6|maxLength:25',
      confirm_password: 'required|minLength:6|maxLength:25|same:password'
  });

  validator.check().then(function (matched) {
    if (!matched) {
        res.render('register', {
            error: validator.errors,
            fname: req.body.fname.trim(),
            lname: req.body.lname.trim(),
            mobile: req.body.mobile.trim(),
            email: req.body.email.trim(),
            password: req.body.password.trim(),
            confirm_password: req.body.confirm_password.trim()
        });
    } else {

      var today = new Date();
      var email = req.body.email;

      var users = {
          "first_name": req.body.fname,
          "last_name": req.body.lname,
          "mobile":req.body.mobile,
          "email": req.body.email,
          "password": md5(req.body.password),
          "created": today,
          "modified": today
      }

      connection.query('SELECT * FROM users WHERE email = ?', [email], function (errors, results, fields) {
          if (errors) {
              res.json(errors);
              //res.json({error:'Something went wrong.Please try again.'});
        } else {
             // check email is already exist or not
             if(results.length < 0)
             {
                 res.render('register',{error:{'email':{'message':'Email Id already exist.'}},
                   fname:req.body.fname,
                   lname:req.body.lname,
                   mobile:req.body.mobile,
                   email:req.body.email,
                   password:req.body.password,
                   cnrfm_pswrd:req.body.cnrfm_pswrd,
                   thanks_msg:''
                });
             }
             else {
                  connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
                     if (error) {
                      res.render('register',{
                        fname:req.body.fname,
                        lname:req.body.lname,
                        mobile:req.body.mobile,
                        email:req.body.email,
                        password:req.body.password,
                        cnrfm_pswrd:req.body.cnrfm_pswrd,
                        thanks_msg:'Something went wrong.'
                      });
                     } else {
                       req.session.user_added = 'You have registerd successfully.';
                       res.redirect('/login');
                     }
                  });
             }
          }
      });
    }
  });
}
