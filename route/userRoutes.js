const router=require('express').Router();

const {register,activateUser,Signin,forgotPassword,resetPassword}=require('../controllers/userController')

router.post('/user/signup',register);
router.patch('/user/activate/:id',activateUser);
router.post('/user/signin',Signin);
router.patch('/user/forgotPassword',forgotPassword);
router.patch('/user/resetPassword/:id',resetPassword);

module.exports=router;