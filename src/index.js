const express=require('express');
const bodyParser=require('body-parser');

const { PORT }=require('./config/serverConfig');

//const { User }=require('./models/index');
//const bcrypt=require('bcrypt');
const UserRepository=require('./repository/user-repository');
const app=express();

const apiRoutes=require('./routes/index');

const StartServer=()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);
    app.listen(PORT,async()=>{
        console.log(`Server started on port ${PORT}`);
        const repo=new UserRepository();
        const response=await repo.getById(1);
        console.log(response);
        // const incomingPassword='123456';
        // const user=await User.findByPk(3);
        // const response=bcrypt.compareSync(incomingPassword,user.password);
        // console.log(response);

    });
}
StartServer();