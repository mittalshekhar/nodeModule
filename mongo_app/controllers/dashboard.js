var connection = require('../config');

exports.dashboard = function (req, res) {
    var user_id = req.session.user_id;
    
    connection.query('SELECT *,DATE_FORMAT(created, "%d %b,%Y") as member_since FROM node_users WHERE id = ?', [user_id], function (error, results, fields) {
        if (error) {
            res.redirect('home',{error:'Something went wrong.Please try again.'});
        } else {
            if (results.length > 0) {
                res.render('dashboard',{user_data:results[0]});
            } else {
                res.json('No record found');
            }
        }
    });
}