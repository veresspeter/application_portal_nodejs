var db = require('mongodb');

/**
 *  Creates/Updates the tender, than redirects to the tenders page (/tenders)
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if( req.method === 'POST' ){

            res.tpl.tender.title = req.body.title;
            res.tpl.tender.description = req.body.description;
            res.tpl.tender.duedate = req.body.duedate;
            res.tpl.tender.startdate = Date.now();
            res.tpl.tender._publisher = db.ObjectId( res.tpl.user._id );

            res.tpl.tender.save( function (err) {
                console.log(err);
                res.redirect('/tender');
            });

        } else {
            return next();
        }
    };

};