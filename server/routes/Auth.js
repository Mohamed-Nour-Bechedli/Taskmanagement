const router = require('express').Router();
const { loggIn } = require('../Controllers/Auth');


router.post('/login', loggIn );



module.exports = router;