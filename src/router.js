import Router from 'express';

const routers = Router();

routers.get("/",() =>{
    console.log("Yes");
});

export default routers;
