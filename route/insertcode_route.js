const express = require('express');
const router = express.Router();
const{insertCode,chargeCode,insertEmpInDept} = require('../logic/insertcode_logic');


router.post('/insertcode',insertCode);
router.post('/chargecode',chargeCode);
// router.delete('/:id',deleteaddress);


module.exports = router;
