const express = require('express')

// import the route file
var Router  = require('router')
var ejs     = require('ejs');
// const route = require('./route');

// use bodyParser for get submit data from the form
var bodyParser = require('body-parser');




const app 		= express()
const router 	= express.Router();

const port = 3004

// set the view engine of html pages with ejs
app.set('view engine', 'ejs');


// set the html(ejs) page path here
app.set('views', __dirname + '/views');
// app.engine('ejs', ejs.renderFile);
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())



// if you want to set the assets 
app.use('/assets', express.static('assets'));
//app.use('/static', express.static('public'))


/// 
app.get('/', function (req, res) {
  res.render('home');
})



// parse application/x-www-form-urlencoded
/*app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})*/

// create application/json parser
// var jsonParser = bodyParser.json()
 
// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
// POST /login gets urlencoded bodies
/*app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.email)
})*/
 
// POST /api/users gets JSON bodies
/*app.post('/api/users', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  // create user in req.body
})
*/

// use for when submit and create the route

//app.use(express.bodyParser());
app.use('/',router)
//app.use()


var login = require('./login');
router.post('/login',login.login); // create a module for login page

// example if your are not set the views directory
app.get('/demo', function (req, res) {
  res.render(__dirname + '/views/index');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));