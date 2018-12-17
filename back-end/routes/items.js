var Item = require("./../schemas/item");

module.exports = function(app) {
    app.route('/items')
    // Get all store items
        .get((req, res) => {
            Item.find({}, (err, items)=> {
                if(err){
                    res.send(err);
                }
                else {
                    res.send(items);
                }
            });
        })
        // Add new Store item
        .post((req, res) => {
            var item = new Item();
            var data = req.body;
            item.name = data.name;
            item.stock = data.quantity;
            item.price = data.price;
            item.timesOrdered = 0;
            item.rating = 0;
            item.url = data.url;
            item.flagged = false;
            item.save((err, obj) => {
                if(err) {
                    res.send(err);
                    return;
                }
                res.send(obj);
            }); 
        });

    // for specific store items
    app.route('/items/:id')
    // Get one item
        .get((req, res) => {
            Item.findOne({_id: req.params.id}, (err, item) => {
                if(err) {
                    res.send(err);
                    return;
                }
                res.send(item);
            });
        })
        // Change item
        .post((req, res) => {
            Item.findOne({_id: req.params.id}, (err, item) => {
                if(err) {
                    res.send(err);
                    return;
                }
                var data = req.body;
                if(data.name)
                    item.name = data.name;
                if(data.price)
                    item.price = data.price;
                if(data.quantity)
                    item.stock = data.quantity;
                if(data.timesOrdered)
                    item.timesOrdered = data.timesOrdered;
                if(data.rating)
                    item.rating = data.rating;
                if(data.url)
                    item.url = data.url;
                if(data.flagged != undefined)
                    item.flagged = data.flagged;
                item.save((err, item) => {
                    if(err)
                        res.send(err);
                    else
                        res.send(item);
                })
            });
        })
        // Remove item
        .delete((req, res) => {
            Item.deleteOne({_id: req.params.id}, (err, item) => {
                if(err) {
                    res.send(err);
                }
                else {
                    res.send(item);
                }
            });
        });

}