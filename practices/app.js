const express = require('express')

// import the route file
var Router  = require('router')
var ejs     = require('ejs');
// const route = require('./route');

// use bodyParser for get submit data from the form
var bodyParser = require('body-parser');

// import the session like session_start
const session = require('express-session');

const app 		= express()
const router 	= express.Router();

const port = 3004

// set the view engine of html pages with ejs
app.set('view engine', 'ejs');

// set the html(ejs) page path here
app.set('views', __dirname + '/views');

// if you want to set the assets
app.use('/assets', express.static('assets'));

// app.engine('ejs', ejs.renderFile);

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser);
// create application/json parser
var jsonParser = bodyParser.json()
app.use(jsonParser);

/*app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})*/

// set the session configration
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true,
    cookie : { path: '/', httpOnly: true, secure: false, maxAge: null }
}));

// Authentication and Authorization Middleware
var auth = function (req, res, next) {
  req.session.user_id = 1;
  if (req.session && req.session.user_id) {
       // get the user-detail of login user and set the session
        var auth = require('./auth');
        auth.userDetail(req.session.user_id,function(getUserDetail){
            if(userDetail.length)
            {
              // console.log("sdsd");
              // console.log(userDetail);
              req.session.userDetail = userDetail;
              return next();
            }
        });
        
   } else {
       res.redirect('/login');
   }
};

var before_auth = function (req, res, next) {
  if (req.session && req.session.user_id) {
      res.redirect('/');
  } else {
      return next();
  }
};

///
const dashboard = require('./dashboard');
app.get('/' , auth,dashboard.userList)
   .get('/login',before_auth ,function (req, res) {
        res.render('home',{
          thanks_msg : req.session.user_added
        });
        req.session.user_added = '';
    })
    .get('/register', before_auth ,function (req, res) {
      res.render('register',{
          fname:req.body.fname,
          lname:req.body.lname,
          mobile:req.body.mobile,
          email:req.body.email,
          password:req.body.password,
          cnrfm_pswrd:req.body.cnrfm_pswrd
      });
    })
    .get('/demo', function (req, res) {
        // example if your are not set the views directory
        res.render(__dirname + '/views/index');
    })

// POST /login gets urlencoded bodies
/*app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.email)
})*/

// POST /api/users gets JSON bodies
/*app.post('/api/users', jsonParser, function (req, res) {
   if (!req.body) return res.sendStatus(400)
   // create user in req.body
})*/

// use for when submit and create the route

//app.use(express.bodyParser());
app.use('/',router)

/******************************** POST Page code ************************/
var login = require('./login');
var register = require('./register');

router.post('/login', before_auth ,login.login) // create a module for login page
      .post('/register', before_auth ,register.register) // create a module for login page

app.listen(port, () => console.log(`Example app listening on port ${port}!`));