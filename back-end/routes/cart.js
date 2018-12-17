var Cart = require("./../schemas/cart");

module.exports = function(app) {
    app.route("/cart/:id")
        .get((req, res) => {
            Cart.findOne({_id: req.params.id}, (err, cart) => {
                if(err) {
                    res.send(err);
                    return;
                }
                res.send(cart);
            });
        });
}