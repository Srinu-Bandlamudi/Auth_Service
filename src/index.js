const express=require('express');

const { PORT }=require('./config/serverConfig');

const app=express();


const StartServer=()=>{
    app.listen(PORT,()=>{
        console.log(`Server started on port ${PORT}`);
    });
}
StartServer();