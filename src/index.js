const express=require('express');
const bodyParser=require('body-parser');

const { PORT }=require('./config/serverConfig');

const UserService=require('./services/user-service.');
const app=express();

const apiRoutes=require('./routes/index');

const StartServer=()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);
    app.listen(PORT,async()=>{
        console.log(`Server started on port ${PORT}`);
        const service=new UserService();
         //const newToken=service.createToken({email:'srinu55@gmail.com',id:1});
        // console.log(newToken);
         const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNyaW51NTVAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTcwNzU0NzY5MSwiZXhwIjoxNzA3NTQ3NjkxfQ.1bh0bTusxUQDZX5rO7KooKsoI3CRV8JGIIYH8-6MuAI';
        const response=service.verifyToken(token);
        console.log(response);

    });
}
StartServer();