/**
 *  Deletes the app, than redirects to the apps page (/apps)
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        res.tpl.tender.remove(function (err) {
            console.log(err);
            res.redirect('/tender/all');
        });
    };

};