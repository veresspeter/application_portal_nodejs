module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.user = new objectrepository.userModel();
        res.tpl.user.name = req.body.name;
        res.tpl.user.username = req.body.username;
        res.tpl.user.password = req.body.password;
        res.tpl.user.isadmin = false;
        res.tpl.user.birthdate = req.body.birthdate;
        res.tpl.user.birthplace = req.body.birthplace;
        res.tpl.user.mothername = req.body.mothername;
        res.tpl.user.address = req.body.address;
        res.tpl.user.email = req.body.email;
        res.tpl.user.phone = req.body.phone;

        if (req.method !== 'POST')
            return next();

        if ( req.body.password === req.body.repassword ) {

            res.tpl.user.save(function (err) {
                console.log(err);
                res.redirect('/');
            })

        } else {
            return next()
        }

    }

}