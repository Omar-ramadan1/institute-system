const express = require('express');
const router = express.Router();
const{insertChargecode} = require('../logic/chargecode_logic');


router.post('/insertchargecode',insertChargecode);


module.exports = router;
