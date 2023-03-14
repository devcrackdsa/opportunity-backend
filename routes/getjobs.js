const {router,upload} = require('../functions/required');
const jobscontroller =require('../controller/jobs');

router
  .get('/',jobscontroller.getitems)
  .get('/tags',jobscontroller.getbytag);

module.exports=router