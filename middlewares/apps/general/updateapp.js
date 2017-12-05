
var db = require('mongodb');

module.exports = function (objectrepository) {

    return function (req, res, next) {

        if ( !req.files )
            return res.tpl.error('no file uploaded');

        objectrepository.appModel.find( { $and: [ { _tender : req.params.id }, { _owner : res.tpl.user._id } ] } ).exec(function (err, result) {
            if ( result.length !== 0 ) {
                res.tpl.app = result[0];
            } else {
                res.tpl.app = new objectrepository.appModel();
                res.tpl.app._owner = db.ObjectId( res.tpl.user._id );
                res.tpl.app._tender = db.ObjectId( req.params.id );
            }

            res.tpl.app.filename = req.files.application.name;
            res.tpl.app.received = Date.now();

            res.tpl.app.save( function (err) {
                console.log(err);

                req.files.application.mv( 'public/uploads/' + req.files.application.name , function (err) {
                    console.log(err);
                    return res.redirect('/usr/app');
                })

            });
        });

    };

};