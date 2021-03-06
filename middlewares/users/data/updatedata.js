/**
 *  Creates / updates the user profile
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {


        if (req.method !== 'POST'){
            return next();
        }

        res.tpl.user.name = req.body.name;
        res.tpl.user.username = req.body.username;
        res.tpl.user.birthdate = req.body.birthdate;
        res.tpl.user.birthplace = req.body.birthplace;
        res.tpl.user.mothername = req.body.mothername;
        res.tpl.user.address = req.body.address;
        res.tpl.user.email = req.body.email;
        res.tpl.user.phone = req.body.phone;

        res.tpl.user.save(function (err) {
            console.log(err);
            return next();
        })

    };

};