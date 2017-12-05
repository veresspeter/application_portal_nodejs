module.exports = function (objectrepository) {

    return function (req, res, next) {

        if ( res.tpl.tenders === null ){
            return next();
        } else {

            res.tpl.tenders.forEach( function (tender) {

                objectrepository.appModel.find( { $and: [ { _tender : tender._id}, { _owner : res.tpl.user._id } ] } ).exec(function (err, result) {
                    if ( result.length != 0 ) {
                        tender.myapp = result[0].filename;
                    }
                    return next();
                })

            });
        }
    };
};