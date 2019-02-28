var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var v = require('node-input-validator');
var dateFormat = require('dateformat');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(expressLayouts);

//// initialize express-session to allow us track the logged-in user across sessions.
//app.use(session({
//    secret: '2C44-4D44-WppQ38S',
//    resave: true,
//    saveUninitialized: true
//}));

//DB Connection





// Authentication and Authorization Middleware
//var auth = function (req, res, next) {
//    if (req.session && req.session.user_name) {
//        return next();
//    } else {
//        res.redirect('login');
//    }
//};

var user_handler = require('./controllers/user_handler');
////var user_dashboard = require('./controllers/dashboard');
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use('/', router);
//
//
router.get('/', function (req, res) {
    res.render('register');
});
router.get('/register', function (req, res) {
    res.render('register');
});
router.post('/register', function (req, res, next) {
    
    let validator = new v(req.body, {
        first_name: 'required|alpha|minLength:3',
        last_name: 'required|alpha|minLength:3',
        mobile: 'required|phoneNumber|minLength:10|maxLength:10',
        email: 'required|email',
        password: 'required|minLength:6|maxLength:25',
        confirm_password: 'required|minLength:6|maxLength:25|same:password'
    });
    validator.check().then(function (matched) {
        if (!matched) {
            res.render('register', {
                error: validator.errors,
                first_name: req.body.first_name.trim(),
                last_name: req.body.last_name.trim(),
                mobile: req.body.mobile.trim(),
                email: req.body.email.trim(),
                password: req.body.password.trim(),
                confirm_password: req.body.confirm_password.trim()
            });
        } else {
            next();
        }
    });
}, user_handler.register);


app.post("/add_user", (req, res) => {
    var myData = new SaveData(req.body);
    myData.save()
            .then(item => {
                res.send("item saved to database");
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
});
//
//////route to handle user registration
//router.post('/login', function (req, res, next) {
//    let validator = new v(req.body, {
//        email: 'required|email',
//        password: 'required|minLength:6|maxLength:25'
//    });
//    validator.check().then(function (matched) {
//        if (!matched) {
//            res.render('home', {
//                error: validator.errors,
//                email: req.body.email,
//                password: req.body.password
//            });
//        } else {
//            next();
//        }
//    });
//}, user_handler.save);

app.listen(5000, () => console.log('http://localhost:5000'))
