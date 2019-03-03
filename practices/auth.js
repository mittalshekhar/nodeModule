const con = require('./connection');

exports.userDetail = function(user_id,callback){
    /// get the all user list and render on view
    con.query('select * from users where id = ?',[user_id],function(error,results,fields){
        if(results.length > 0)
        {
            callback(results[0]);
        }
        callback(null);
    })
};

