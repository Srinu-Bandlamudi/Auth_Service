const UserRepository=require('../repository/user-repository');

const jwt=require('jsonwebtoken');

const bcrypt=require('bcrypt');
const { JWT_KEY }=require('../config/serverConfig');

class UserService{
    constructor(){
        this.userRepository=new UserRepository();
    }
    
    async create(data){
        try {
            const user=await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log('Something went wrong in the Service layer');
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
    checkPassword(userInputPlainPassword,encrypedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encrypedPassword);
        } catch (error) {
            console.log('something went wrong in password comparison');
            throw error;
        }
    }
}

module.exports=UserService;