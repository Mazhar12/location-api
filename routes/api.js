const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja')


// get a list of ninjas from the db
router.get('/ninjas', function(req, res, next){ 
     
     if(req.query.lng === undefined && req.query.lat === undefined)
         { 
            Ninja.find({}).then(function(ninjas){

                 res.send(ninjas);

            }); 
         }
   else 
      {
          Ninja.geoNear(
            {type: 'Point', coordinates: [parseFloat(req.query.lat), parseFloat(req.query.lng)]},
            {maxDistance: 100000, spherical: true}
          ).then(function(ninjas){
            return ninjas.filter((ninja) => ninja.obj.available == true)

          }).then(function(ninjas){
              res.send(ninjas);
            });
      }
});


router.post('/ninjas', function(req, res, next){
    console.log(req.query)
    let newNinja = {
                name :  req.query.name,
                rank:   req.query.rank,
                available:  req.query.available,
                geometry:{
                              type:'Point',
                              coordinates: [parseFloat(req.query.lat), parseFloat(req.query.lng)]
                    }
    }
    Ninja.create(newNinja).then(function(ninja){
      res.send(ninja);
    }).catch(next);

});


router.put('/ninjas/:id', function(req, res, next){
  Ninja.findByIdAndUpdate({_id:req.params.id},{name: req.body.name}).then(function(){
    Ninja.findOne({_id:req.params.id}).then(function(ninja){
  res.send(ninja);
    });

  });
});


router.delete('/ninjas/:id', function(req, res, next){

    Ninja.findByIdAndRemove({_id:req.params.id}).then(function(){
        
         Ninja.find({}).then(function(ninja){
           res.json(ninja);
        });

    });
});

module.exports = router;
