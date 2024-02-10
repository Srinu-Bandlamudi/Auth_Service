const express=require('express');

const { AuthRequestValidators }=require('../../middlewares/index');

const router=express.Router();

const UserController=require('../../controllers/user-controller');

router.post(
    '/signup',
    AuthRequestValidators.validateUserAuth,
    UserController.create
    );
router.post(
    '/signin',
    AuthRequestValidators.validateUserAuth,
    UserController.signIn
    );

module.exports=router;
