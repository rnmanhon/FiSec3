var express = require('express');
var router = express.Router();
var ctrlUser = require('../controllers/user');
var ctrlConsumer = require('../controllers/consumer');
var ctrlRole = require('../controllers/role');
var ctrlAuth = require('../controllers/auth');
var ctrlMap = require('../controllers/map');

router.post('/users', ctrlUser.listUser);
router.post('/login', ctrlUser.login);
router.post('/addUser', ctrlUser.addUser);
router.get('/consumers', ctrlConsumer.listApp);
router.post('/accessToken', ctrlConsumer.grantAccessToken);
router.post('/roles', ctrlRole.listRole);
router.post('/addRole', ctrlRole.addRole);
router.post('/userRole', ctrlRole.userRole);
router.get('/policyVerOfFirstDomain', ctrlAuth.policyVerOfFirstDomain);
router.post('/addPolicy', ctrlAuth.addPolicy);
router.post('/decodeRouteGeometory', ctrlMap.decodeRouteGeometory);


module.exports = router;



