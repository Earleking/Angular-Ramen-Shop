var Cart = require("./../schemas/cart");

module.exports = function(app) {
    app.route('/carts')
    // Get all carts
        .get((req, res) => {
            Cart.find({}, (err, carts)=> {
                if(err){
                    res.send(err);
                }
                else {
                    res.send(carts);
                }
            });
        })
        // Add new cart
        .post((req, res) => {
            var cart = new Cart();
            var data = req.body;
            cart.user = data.user;
            cart.items = [];
            cart.active = true;
            cart.save((err, obj) => {
                if(err) {
                    res.send(err);
                    return;
                }
                res.send(obj);
            }); 
        });
    app.route('/carts/public')
    // get all public carts
        .get((req, res) => {
            Cart.find({public: true}, (err, carts) => {
                if(err) {
                    res.send(err);
                    return;
                }
                res.send(carts);
            });
        })
        // For user's specific cart
    app.route('/carts/:user/:cart')
    // get one cart
        .get((req, res) => {
            Cart.findOne({user: req.params.user, _id: req.params.cart}, (err, cart) => {
                if(err) {
                    res.send(err);
                    return;
                }
                if(cart == null) {
                    var cart = new Cart();
                    cart.user = req.params.user;
                    cart.items = {};
                    cart.active = true;
                    cart.name = "cart";
                    cart.public = false;
                    cart.save((err, obj) => {
                        if(err) {
                            res.send(err);
                            return;
                        }
                        res.send(obj);
                    }); 
                }
                else {
                    res.send(cart);
                }
            });
        })
        // Change cart
        .post((req, res) => {
            Cart.findOne({user: req.params.user, _id: req.params.cart}, (err, cart) => {
                if(err) {
                    res.send(err);
                    return;
                }
                if(cart == null) {
                    res.json({"message": "No cart for this user found"});
                    return;
                }
                var data = req.body;
                console.log("Cart Updated");
                if(data.name)
                    cart.name = data.name;
                if(data.items)
                    cart.items = data.items;
                if(data.active)
                    cart.active = data.active;
                if(data.public)
                    cart.public = data.public
                if(data.name)
                    cart.name = data.name
                cart.save((err, cart) => {
                    if(err)
                        res.send(err);
                    else
                        res.send(cart);
                })
            });
        })
        // delete cart
        .delete((req, res) => {
            // console.log(req.params.user);
            Cart.findOneAndDelete({user: req.params.user, _id: req.params.cart}, (err, cart) => {
                console.log(cart);
                if(err) {
                    res.send(err);
                }
                else {
                    res.send(cart);
                }
            });
        });

        // get user's carts
    app.route('/carts/:id')
    // get all carts for user
        .get((req, res) => {
            Cart.find({user: req.params.id}, (err, cart) => {
                if(err) {
                    res.send(err);
                    return;
                }
                if(cart.length == 0) {
                    var cart = new Cart();
                    cart.user = req.params.id;
                    cart.items = {};
                    cart.active = true;
                    cart.name = "cart";
                    cart.public = true;
                    cart.save((err, obj) => {
                        if(err) {
                            res.send(err);
                            return;
                        }
                        res.send(obj);
                    }); 
                }
                else {
                    res.send(cart);
                }
            });
        })
        // add new cart for user
        .post((req, res) => {
            Cart.findOne({user: req.params.id}, (err, cart) => {
                if(err) {
                    res.send(err);
                    return;
                }
                if(cart == null) {
                    res.json({"message": "No cart for this user found"});
                    return;
                }
                var data = req.body;
                if(data.name)
                    cart.name = data.name;
                if(data.items)
                    cart.items = data.items;
                if(data.active)
                    cart.active = data.active;
                cart.save((err, cart) => {
                    if(err)
                        res.send(err);
                    else
                        res.send(cart);
                })
            });
        })
        // Delete user carts
        .delete((req, res) => {
            Cart.findOneAndDelete({_id: req.params.id}, (err, cart) => {
                if(err) {
                    res.send(err);
                }
                else {
                    res.send(cart);
                }
            });
        })
        // Add new cart
        .put((req, res) => {
            var cart = new Cart();
            data = req.body;
            cart.user = req.params.id;
            cart.items = {};
            cart.active = true;
            cart.name = data.name;
            cart.public = data.public;
            if(data.name == undefined || data.public == undefined) {
                res.json({"message": "Invalid cart"});
                return;
            }
            cart.save((err, obj) => {
                if(err) {
                    res.send(err);
                    return;
                }
                res.send(obj);
            }); 
        });

}