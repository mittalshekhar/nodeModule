var md5 = require('md5');
const validator = require('validator');
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/express_mongodb", {useNewUrlParser: true});


var nameSchema = new mongoose.Schema({
    first_name: {type: String, required: true, minlength: 3,
        maxlength: 200},
    last_name: {type: String, required: true, minlength: 3,
        maxlength: 200},
    email_id: {type: String,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        }
    },
    password: {type: String, required: true, minlength: 4,
        maxlength: 200},
    confirm_password: {type: String, required: true, minlength: 4,
        maxlength: 200}
});

var Employee = mongoose.model("Employee", nameSchema);

exports.register = function (req, res) {
    var email = req.body.email;
    var password = md5(req.body.password);

    res.render('home', {error: {'email': {'message': 'Email and password does not match'}}, email: 'dobbu@yopmail.com'});
}
//
//
//const UserSchema = new mongoose.Schema({
//    first_name: {type: String, required: true, minlength: 4,
//        maxlength: 200},
//    last_name: {type: String, required: true, minlength: 4,
//        maxlength: 200},
//    username: {type: String, required: true, minlength: 4,
//        maxlength: 200},
//    email_id: {type: String,
//        validate: {
//            validator: validator.isEmail,
//            message: '{VALUE} is not a valid email',
//            isAsync: false
//        }
//    },
//    new_password: {type: String, required: true, minlength: 4,
//        maxlength: 200},
//    confirm_password: {type: String, required: true, minlength: 4,
//        maxlength: 200},
//    updated_at: {type: Date, default: Date.now}
//});
//
//model('Employee', EmployeeSchema);
//var employeeController = {};
//
//employeeController.save = async function (req, res) {
//
//    var employee = new Employee(req.body);
//    // /employee.new_password=cryptPassword(employee.new_password);
//    try {
//        const result = await employee.save();
//        console.log("Successfully created an employee.");
//        res.redirect("/employees/show/" + employee._id);
//        //console.log(result);
//    } catch (err) {
//        console.log(err.errors);
//        res.render("../views/employees/create", {errors: err.errors});
//        //console.log(err.message)
//    }
//
//}


//module.exports = employeeController;











//exports.register = function (req, res) {
//    var today = new Date();
//    var email = req.body.email;
//
//    var users = {
//        "first_name": req.body.fname,
//        "last_name": req.body.lname,
//        "mobile":req.body.mobile,
//        "email": req.body.email,
//        "password": md5(req.body.password),
//        "created": today,
//        "modified": today
//    }
//    
//    connection.query('SELECT * FROM node_users WHERE email = ?', [email], function (error, results, fields) {
//        if (error) {
//            res.json({error:'Something went wrong.Please try again.'});
//        } else {
//            if (results.length == 0) {
//                connection.query('INSERT INTO node_users SET ?', users, function (error, results, fields) {
//                    if (error) {
//                        res.json({error:'Something went wrong.Please try again.'});
//                    } else {
//                        req.session.user_added = 'You have registerd successfully.';
////======================= START SEND EMAIL==============================
//                        var transporter = nodemailer.createTransport({
//                            service: 'SMTP',
//                            auth: {
//                              user: 'sachin.singh424@gmail.com',
//                              pass: 'XXXXXXXX'
//                            }
//                          });
//                          
//                          var mailOptions = {
//                            from: 'sachin.singh424@gmail.com',
//                            to: email,
//                            subject: 'Sending Email using Node.js',
//                            text: 'That was easy!'
//                          };
//                          
//                          transporter.sendMail(mailOptions, function(error, info){
//                            if (error) {
//                              console.log(error);
//                            } else {
//                              console.log('Email sent: ' + info.response);
//                            }
//                          });
////======================= END SEND EMAIL==============================
//
//                        res.redirect('/register');
//                    }
//                });
//            } else {
//                res.render('register',{error:{'email':{'message':'Email Id already exist.'}},
//                fname:req.body.fname,
//                lname:req.body.lname,
//                mobile:req.body.mobile,
//                email:req.body.email,
//                password:req.body.password,
//                cnrfm_pswrd:req.body.cnrfm_pswrd,
//                thanks_msg:''
//            });
//            }
//        }
//    });
//}
