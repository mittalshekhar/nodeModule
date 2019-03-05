const con = require('./connection');

exports.login = function(req,res){
        ////////////////////////////////////
        res.end(res.body);
        con.query('SELECT * FROM users WHERE id = ?',[1], function (error, results, fields) {
        if (error) {
          res.json({
            status: 'error',
            message : 'invalid user',
            code : '404'
          });
        }else{
          // console.log('The solution is: ', results);
            res.render('profile');
        }
        ///////////////////////////////////
      });
};