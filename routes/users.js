var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.route('/score')
    .get(function(req, res, next) {
      User.find({}).sort('-score').exec(function(err, users) {
          if(err) return res.status(500).send({error: 'database failure'});
        res.json({success:true, data:users});
      })
    })
    .post(function(req, res, next) {
      var user = new User();
      user.score = req.body.score;
      user.name = req.body.name;
      
      user.save(function(err) {
        if(err) {
          console.error(err);
          res.status(500).json({success:false, message:err});
          return;
        }
        res.json({success:true, data:user});
      })
    })
    .delete(function(req, res, next) {
        User.remove({ _id: req.body._id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });
            res.json({success:true, data:req.body._id});
        })
    })

module.exports = router;
