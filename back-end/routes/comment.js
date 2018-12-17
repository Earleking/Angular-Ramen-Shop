var UserComment = require("./../schemas/comments");

module.exports = function(app) { 
    app.route("/comment/:id")
        .get((req, res) => {
            UserComment.findOne({_id: req.params.id}, (err, items) => {
                if(err) {
                    res.send(err);
                }
                else {
                    res.send(items);
                }
            });
        })
        .post((req, res) => {
            UserComment.findOne({_id: req.params.id}, (err, comment) => {
                if(err) {
                    res.send(err);
                }
                else {
                    var data = req.body;
                    if(data.hidden)
                        comment.hidden = data.hidden;
                    comment.save((err, obj) => {
                        if(err)
                            res.send(err);
                        else
                            res.send(obj);
                    });
                }
            });
            
        });
}