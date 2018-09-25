var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');


/* GET users listing. */
router.get('/', function(req, res, next) {

  userController.findAllPosts({})
    .then(data => res.json(data))
    .catch(err => res.json(err))

});

router.post('/', function(req,res, next) {

  userController.createUser(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));

});

router.post('/post', function(req,res, next) {

  userController.createPost(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));

});

module.exports = router;
