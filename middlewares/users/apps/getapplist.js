var db = require('mongodb');

module.exports = function (objectrepository) {

    return function (req, res, next) {
        objectrepository.appModel.aggregate([
            {
                $match:
                    {
                        _owner: new db.ObjectId(req.session.userid)
                    }
            },
            {
                $lookup:
                    {
                        from: 'tenders',
                        localField: '_tender',
                        foreignField: '_id',
                        as: 'tender'
                    }
            },
            {
                $lookup:
                    {
                        from: 'users',
                        localField: '_owner',
                        foreignField: '_id',
                        as: 'owner'
                    }
            },
            {   $unwind: "$tender"  },
            {   $unwind: "$owner"  }
        ]).exec(function (err, result) {
            console.log(err);
            res.tpl.tenders = [];
            result.forEach( function (app) {
                res.tpl.tenders.add(app.tender);
            });
            res.tpl.apps = result;
            console.log(result);
            return next();
        });
    };

};