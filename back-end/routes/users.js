var User = require("./../schemas/user");
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD
    }
});

module.exports = function(app) {
    // For users
    app.route('/users')
    // Get all users
        .get((req, res) => {
            User.find({}, (err, users) => {
                res.send(users);
            });
        })
        // add new user
        .post((req, res) => {
            var data = req.body;
            User.findOne({email: data.email}, (err, curUser) => {
                if(curUser != null) {
                    res.json({"Message": "User already exists"});
                    return;
                }
                var user = new User();
                user.email = data.email;
                user.password = crypto.createHash('sha256').update(data.password).digest('hex');
                user.authentication = data.authentication;
                user.active = data.active;
                user.needsEmail = true;
                user.save((err, obj) => {
                    if(err) {
                        res.send(err);
                        return;
                    }
                    var mailOptions = {
                        from: 'arek.fielding@gmail.com',
                        to: 'arek.fielding@gmail.com', //TODO
                        subject: 'Authentication',
                        text: `Click here: http://localhost:3000/auth/${obj["_id"]}`//only hard coded here cuz req.base url is wack on localhost
                        //noramlly would use req.baseUrl inplace of the localhost
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            res.send(error);
                        } else {
                            res.send(obj);
                        }
                    });
                }); 
                // Send email auth
                
            });
            
        });
        
    app.route('/users/:id')
    // Get one user
        .get((req, res) => {
            User.findOne({_id: req.params.id}, (err, user) => {
                if(err) {
                    res.send(err);
                    return;
                }
                res.send(user);
            });
        })
        // Update user
        .post((req, res) => {
            User.findOne({_id: req.params.id}, (err, user) => {
                if(err) {
                    res.send(err);
                    return;
                }
                var data = req.body;
                if(data.email)
                    user.email = data.email;
                if(data.authentication)
                    user.authentication = data.authentication;
                if(data.active)
                    user.active = data.active;
                user.save((err, user) => {
                    if(err)
                        res.send(err);
                    else
                        res.send(user);
                })
            });
        })
        // Delete one user
        .delete((req, res) => {
            User.deleteOne({_id: req.params.id}, (err, user) => {
                if(err) {
                    res.send(err);
                }
                else {
                    res.send(user);
                }
            });
        });
        
};