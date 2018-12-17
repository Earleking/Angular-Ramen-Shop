var Notice = require("./../schemas/notice");

module.exports = function(app) {
    app.route("/notice")
        .get((req, res) => {
            Notice.find({}, (err, notices) => {
                if(err)
                    res.send(err);
                else
                    res.send(notices);
            });
        })
        .post((req, res) => {
            var data = req.body;
            var notice = new Notice();
            notice.filee = data.filee;
            notice.type = data.type;
            notice.body = data.text;
            notice.resolved = false;
            notice.save((err, obj) => {
                if(err)
                    res.send(err);
                else
                    res.send(obj);
            });            
        });
    app.route("/notice/:id")
        .post((req, res) => {
            Notice.findOne({_id : req.params.id}, (err, notice) => {
                if(notice == null) {
                    res.json({"body": "No notice of that type was found"});
                    return;
                }
                notice.resolved = true;
                notice.save((err, obj) => {
                    if(err)
                        res.send(err);
                    else
                        res.send(obj);
                }); 
            });
        })
}