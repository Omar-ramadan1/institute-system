const express = require('express');
const router = express.Router();
const{insertStage,getAllStage} = require('../logic/stage_logic');



router.post('/',insertStage);
 router.get('/',getAllStage);
// router.delete('/:id',deleteaddress);


module.exports = router;
