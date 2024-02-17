const UserRepository=require('../repository/user-repository');

const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const { JWT_KEY }=require('../config/serverConfig');
//const AppErrors = require('../utils/error-handler');

class UserService{
    constructor(){
        this.userRepository=new UserRepository();
    }
    
    async create(data){
        try {
            const user=await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name =='SequelizeValidationError'){
                throw error;
            }
            console.log('Something went wrong in the Service layer');
            throw error;
        }
    }

    async signIn(email,plainPassword){
        try {
            //step-1:fetch the user using email
            const user= await this.userRepository.getByEmail(email);

            //step-2:compare incoming plain password with stored encrypted password
            const passwordsMatch=this.checkPassword(plainPassword,user.password);
            if(!passwordsMatch){
                console.log('password doesnt match' );
                throw {error:'Incorrect Password'};
            }
            //step-3:if passwords matches create a token and send it to the user
            const newJWT=this.createToken({email:user.email,id:user.id});
            return newJWT;
            
        } catch (error) {
            if(error.name=='AttributeNotFound'){
                throw error;
            }
            console.log('something went wrong int the signIn process');
            throw error;
        }
    }

    createToken(user){
        try {
            const result=jwt.sign(user,JWT_KEY,{expiresIn:'1d'});
            return result;
        } catch (error) {
            console.log('Something went wrong in the Service layer');
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response=jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log('Something went wrong in the Service layer',error);
            throw error;   
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log('something went wrong in password comparison');
            throw error;
        }
    }
    async isAuthenticated(token){
        try {
            const response=await this.verifyToken(token);
            if(!response){
                throw {error:'Invalid Token'}
            }
            const user=await this.userRepository.getById(response.id);
            if(!user){
                throw {error:'No user with the corresponding token exists'}
            }
            return user.id;
        } catch (error) {
            console.log('something went wrong in password comparison');
            throw error;
        }
    }
    async isAdmin(userId){
        try {
           return await this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log('something went wrong in service layer');
            throw error;
        }
        
    }
}

module.exports=UserService;