var UserComment = require("./../schemas/comments");

module.exports = function(app) {
    app.route("/comments")
        .get((req, res) => {
            UserComment.find({}, (err, items)=> {
                if(err){
                    res.send(err);
                }
                else {
                    res.send(items);
                }
            });
        })
        .post((req, res) => {
            var comment = new UserComment();
            var data = req.body;
            comment.item = data.item._id;
            comment.user = data.user.id;
            comment.name = data.user.name;
            comment.title = data.title;
            comment.text = data.text;
            comment.rating = data.rating;
            comment.time = new Date();
            comment.hidden = false;
            comment.save((err, obj) => {
                if(err)
                    res.send(err);
                else
                    res.send(obj);
            });
        });
    app.route("/comments/:item")
        .get((req, res) => {
            UserComment.find({item: req.params.item}, (err, items) => {
                if(err) {
                    res.send(err);
                }
                else {
                    res.send(items);
                }
            });
        });
}