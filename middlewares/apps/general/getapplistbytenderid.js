var db = require('mongodb');

module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.appModel.aggregate([
            {
                $match:
                    {
                        _tender: db.ObjectId(req.params.id)
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
            {
                $lookup:
                    {
                        from: 'users',
                        localField: '_judge',
                        foreignField: '_id',
                        as: 'judge'
                    }
            },
            {   $unwind: "$tender"  },
            {   $unwind: "$owner"  }
        ]).exec(function (err, result) {
            console.log(err);
            res.tpl.apps = result;
            return next();
        });
    };

};