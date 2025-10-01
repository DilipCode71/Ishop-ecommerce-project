const express=require("express");
const AdminController = require("../Controllers/AdminController");
const AdminRouter=express.Router();

AdminRouter.post(
    "/register",
    
    (req,res)=>{
        const result=new AdminController().create(req.body);

        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
                console.log(error);
            }
        )
    }
)


AdminRouter.post(
    "/login",
    (req,res)=>{
        const result=new AdminController().login(req.body);

        result.then(
            (success)=>{

                res.send(success)
            }
        ).catch(
            (error)=>{
res.send(error)
            }
        )
    }
)

module.exports=AdminRouter;