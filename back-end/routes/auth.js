const crypto = require("crypto");
var User = require("./../schemas/user");

module.exports = function(app) {
    app.route("/auth")
        // Try to auth user
        .post((req, res) => {
            var data = req.body;
            User.findOne({email: data.email}, (err, user) => {
                if(user == null) {
                    res.json({"message": "Authentication failed"});
                    return;
                }
                if(user.password == crypto.createHash('sha256').update(data.password).digest('hex')) {
                    if(user.needsEmail == true) {
                        res.json({"emailNeeded": "Need to verify email"});
                        return;
                    }
                    res.send(user);
                    return;
                }
                
                
                res.json({"message": "Authentication failed"});
            });
        });

    // Validate email
    app.route("/auth/:id")
        .get((req, res) => {
            User.findOne({_id: req.params.id}, (err, user) => {
                if(user == null) {
                    res.json({"Error": "Something is wrong with your url"});
                    return;
                }
                if(user["needsEmail"] != true) {
                    res.json({"Message": "User is already authenticated"});
                    return;
                }
                user.needsEmail = false;
                user.save((err, data) => {
                    res.json({"Message": "User authenticated"});
                });
            });
        });

}