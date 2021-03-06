var itemModel = require('../models/itemModel');

itemModel.remove({}, function(err){
	if(err) console.log(err);
});

module.exports = {
	findOrCreate: function(req, res){	
		itemModel.findOne({'name':req.name},function(err, found){
			if(err){
				return err;
			} else{
				if(found && res){
					return res.send(JSON.stringify(found));
				}else {
					var item = new itemModel({
						"quantity": req.q,
						"name": req.name
					});

					item.save(function(err, newitem){
						if(err){
							return err;
						}
						if(res) return res.send(JSON.stringify(newitem));
					});	
				}
			}
		});
	},
	findAll: function(req, res){
		itemModel.find({}, function(err, data){
			var items = [];
			data.forEach(function(item){
				items.push([item.name, item.quantity]);
			});
			res.send(items);
		});
	},
	increaseQuantity: function(req, res){
		itemModel.update({ "name": req.name }, { $inc: { "quantity": req.q }}, function(err, a){
			if(err){
				return err;
			} else{
				return res.send(a);
			}
		});
	},
	decreaseQuantity: function(req, res){
		itemModel.update({ "name": req.name }, { $inc: { "quantity": -1 }}, function(err){
			if(err){
				return err;
			} else{
				return true;
			}
		});
		itemModel.update({ "name": req.name, "quantity": {$lt: 1} }, { $set: { "quantity": 1 }}, function(err){
			if(err){
				return err;
			} else{
				return res.send("Document updated.");
			}
		});

	},
	delete: function(req,res){
		itemModel.remove({
			'name' : req.name
		}, function(err, item){
			if(err){
				return null;
			}
			return item;
		});
	},
	deleteAll: function(req, res){
		itemModel.remove({}, function(err){
			if(err) console.log(err);
		});
	}
};