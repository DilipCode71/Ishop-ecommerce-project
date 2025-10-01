const express=require("express");
const ColorController = require("../Controllers/ColorController");
const adminAuth = require("../middleware/adminAuth");
const ColorRouter=express.Router();



ColorRouter.post(
    "/create",   
    adminAuth, 
    (req,res)=>{
        const result=new ColorController().createApi(req.body);
        result.then(
            (success)=>{
                res.send(success)
            }
        ).catch(
            (error)=>{
                console.log(error);
                res.send(error)
            }
        )
        
    }
)
// Create color api start


// create color view and read start
ColorRouter.get(
    "/:id?",
    (req,res)=>{
        const result=new ColorController().read(req.params.id);

        result.then(
            (success)=>{
                res.send(success);
            }
        ).catch(
            (error)=>{
                res.send(error);
            }
        )

    }
)

// create color view and read End




// Create status updated start


ColorRouter.patch(
    "/status-update/:id",
    adminAuth,
    (req,res)=>{
        const result=new ColorController().statusChange(req.params.id);
        result.then(
            (success)=>{
                res.send(success)
            }
        ).catch(
            (error)=>{
                res.send(error);
            }
        )
    }
)

// Create status updated End


// Create delete start


ColorRouter.delete(
    "/delete/:id",
    adminAuth,
    (req,res)=>{
        const result=new ColorController().deleteColor(req.params.id);
        result.then(
            (success)=>{
                res.send(success);
            }
        ).catch(
            (error)=>{
                res.send(error)
            }
        )
    }
)


// Create delete End




// Create Edit updated start


ColorRouter.put(
    "/edit/:id",
    adminAuth,
    (req,res)=>{
        const result =new ColorController().editColor(req.params.id,req.body);
        result.then(
            (success)=>{
                res.send(success)
            }
        ).catch(
            (error)=>{
                res.send(error);
            }
        )
    }
)


// Create Edit updated End



module.exports=ColorRouter;
