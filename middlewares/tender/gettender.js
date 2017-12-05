/**
 * Gets the app with the given id
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(req.params.id === 'new'){
            res.tpl.tender = new objectrepository.tenderModel();
            res.tpl.tender.isnew = true;
            return next();
        } else {
            objectrepository.tenderModel.findOne({'_id': req.params.id}, function (err, result) {
                res.tpl.tender = result;
                res.tpl.tender.isnew = false;
                return next();
            } );
        }
    };

};