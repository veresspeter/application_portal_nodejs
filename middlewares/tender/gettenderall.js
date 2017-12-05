
var db = require('mongodb')
/**
 *  Lists all the applications
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        objectrepository.tenderModel.aggregate([
            {
                $match:
                    {
                        duedate: { $lt: new Date( Date.now() ) }
                    }
            },
            {
                $lookup:
                    {
                        from: 'users',
                        localField: '_publisher',
                        foreignField: '_id',
                        as: 'publisher'
                    }
            },
            {
                $unwind: "$publisher"
            }
        ]).exec(function (err, result) {
            console.log(err);
            res.tpl.tenders = result;
            return next();
        })
    };

};