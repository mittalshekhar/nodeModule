const con = require('./connection');

exports.userList = function(req,res){

    // get the all user list and render on view
    var userDetail = req.session.userDetail;
    var user_id    = req.session.user_id;
    var userList   = '';
    con.query('select * from users ',[],function(error,results,fields){
            userList = results;
            res.render('index',{
                userDetail: userDetail,
                userList  : userList
            });
    });
};