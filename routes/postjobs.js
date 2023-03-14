const {router} = require('../functions/required');
const jobscontroller =require('../controller/jobs');

router
  .post('/',upload.single('image'), jobscontroller.saveitem);

module.exports=router