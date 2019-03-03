const con = require('./connection');

exports.userList = function(req,res){

    /// get the all user list and render on view
    // res.end('shekhar');
    // con.query('select * from users',function(error,results,fields){
    //         res.json(results);

    // })
    var user_id = req.session.user_id;
    //res.json(req.session.userDetail);
    res.render('index');

};