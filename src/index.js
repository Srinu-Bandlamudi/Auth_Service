const express=require('express');
const bodyParser=require('body-parser');

const { PORT }=require('./config/serverConfig');

const UserService=require('./services/user-service.');
const app=express();

const apiRoutes=require('./routes/index');

const {User,Role}=require('./models/index');

const StartServer=()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);
    app.listen(PORT,async()=>{
        console.log(`Server started on port ${PORT}`);
       
       if(process.env.DB_SYNC){
             db.sequelize.sync({alter:true});
         }
     

    });
}
StartServer();