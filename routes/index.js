const { authRouter } = require('./auth');
const { userRouter } = require('./user');
const { projectRouter } = require('./project');
const { mainPageRouter } = require('./mainPage');
const { partnerRouter } = require('./partner');
module.exports = {  authRouter, userRouter, projectRouter, mainPageRouter, partnerRouter };