var express = require('express');
var News = require('../models/News');
var router = express.Router();

router.get('/',function(req, res) {
    News.find({}, function(err,newss){
        if(err) return res.status(500).json({error: err});
        res.json(newss);
    });
});
router.get('/:id', function(req, res) {
    News.find({_id:req.params.id}, function(err,newss)
    {
        if(err) return res.status(500).json({message: 'Notizia non trovato'});
        res.json(newss);
    });
});
router.post('/', function (req, res, next) {
    var newUser = News(req.body);
    newUser.save(function(err){
        res.status(201).json(newUser);
    })
});
router.put('/:id',function(req,res,next){
    var _setObj = JSON.parse(JSON.stringify({
        title: req.body.title ? req.body.title : undefined,
        img: req.body.img ? req.body.img : undefined,
        category: req.body.category ? req.body.category : undefined,
        description: req.body.description ? req.body.description : undefined

    }));
    if (req.params.id == 'all'){
        var conditions = {}, update =( {$set: _setObj}), options = { multi: true };
        return News.update(conditions, update, options, callback);
        function callback (err, numAffected) {
            if(err) return res.status(500).json({message: 'Errore'});
            else return res.json({message : "Editati tutti gli utenti"})
        }
    }
    else{
        News.findOne({_id: req.params.id}).exec(function(err, newss){
            if(err) return res.status(500).json({message: 'Notizia non trovato'});
            if(!newss) return res.status(404).json({message: 'Notizia non trovato'});
            for(key in req.body) {
                newss[key] = req.body[key];
            }
            newss.save(function(err){
                if(err) return res.status(500).json({message: 'Non riesco a salvare'});
                res.json(newss);
            })
        })}
});
router.delete('/:id', function (req, res, next) {
    News.remove({_id: req.params.id}, function(err){
        if(err) return response.status(500).json({message:'Notizia non trovato'});
        res.json({message : 'Notizia eliminato correttamente'})
    })
});
router.delete('/', function (req, res) {
    if (req.query.x == '_All' || req.query.x == '_all') {
        News.remove({}, function(err) {
            if (err) {
                res.json({message : 'Errore'})
            } else {
                res.json({message : 'Notizie eliminati correttamente'})}
        });
    };

});

module.exports = router;