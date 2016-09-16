var express = require('express');
var router = express.Router();
var itemCtrl = require('./controllers/itemCtrl');



router.post('/add_item/:name', function(req, res){
	var name = req.params.name;
  	itemCtrl.findOrCreate({'name': name}, res);
});

router.post('/update_item/:name/:op', function(req, res){
	var name = req.params.name;
	var op = req.params.op;
	if(op == "inc"){
		itemCtrl.increaseQuantity({'name': name}, res);
	}else{
		itemCtrl.decreaseQuantity({'name': name}, res);
	}
});

router.post('/fetchList', function(req, res){
	itemCtrl.findAll({}, res);
});

router.post('/remove_item/:name', function(req, res){
	var name = req.params.name;
	if(name =="deleteAll"){
		itemCtrl.deleteAll({}, res);
	}else{
		itemCtrl.delete({'name': name}, res);
	}
});

module.exports = router;