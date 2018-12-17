var Policy = require("./../schemas/policy");

module.exports = function(app) {
    app.route("/policy")
        .get((req, res) => {
            Policy.find({}, (err, policies) => {
                res.send(policies);
            });
        })
        .post((req, res) => {
            var data = req.body;
            Policy.findOne({type: body.type}, (err, policy) => {
                if(policy == null) {
                    var pol = new Policy();
                    pol.type = data.type;
                    pol.body = data.text;
                    pol.save((err, obj) => {
                        if(err)
                            res.send(err);
                        else
                            res.send(obj);
                    });
                }
                else
                    res.json({"body": "That type of policy already exists"});
            });
        })

    app.route("/policy/:name")
        .get((req, res) => {
            Policy.findOne({type: req.params.name}, (err, policy) => {
                if(policy == null) {
                    res.json({"body": "No policy of that type was found"});
                    return;
                }
                res.send(policy);
            });
        })
        .post((req, res) => {
            var data = req.body;
            Policy.findOne({type: req.params.name}, (err, policy) => {
                if(policy == null) {
                    var pol = new Policy();
                    pol.type = req.params.name;
                    pol.body = data.text;
                    pol.save((err, obj) => {
                        if(err)
                            res.send(err);
                        else
                            res.send(obj);
                    });
                }
                else {
                    policy.body = data.text;
                    policy.save((err, obj) => {
                        if(err)
                            res.send(err);
                        else
                            res.send(obj);
                    });
                }
            });
        });
}