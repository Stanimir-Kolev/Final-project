// route for users post 
// routes
var User = require('../models/user'); // User model-a го извличаме и го слагаме тука по тази начин може да се прави без .js;
module.exports = function (router) {
    router.post('/users', function (req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        if (req.body.username == null || req.body.username == '' || // kriteria ako e null ili prazen string da ne go puska do sledvashtoto suboshtenie
            req.body.password == null || req.body.password == '' ||
            req.body.email == null || req.body.email == '') {
            res.send('Ensure username, email, and password were provided')
        } else {
            user.save(function (err) {
                if (err) {
                    res.send('Username or Email already exists!');
                } else {
                    res.send('User Created');
                }
            });
        }
    });
    return router; // returnva go kum servera
}