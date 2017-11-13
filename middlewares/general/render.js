/**
 * Creates the html page from templates and given parameters for the response
 */

module.exports = function (objectrepository, viewname) {

    return function (req, res) {
        res.render(viewname,res.tpl);
    };

};