const  express=require("express");
const ProductController = require("../Controllers/ProductController");
const filesUpload=require("express-fileupload");
const adminAuth = require("../middleware/adminAuth");
const ProductRouter=express.Router();


ProductRouter.post(
    "/create",
    

    [
       
       adminAuth,
       filesUpload(
           {
               createParentPath:true
           }
       ),
   ],

        

    
    (req,res)=>{
        const result=new ProductController().createApi(req.body,req.files?.main_image);
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


// Create products api End





// Read and show api start

ProductRouter.get("/:id?",
   
     (req, res) => {

  const result = new ProductController().readShow(req.params.id,req.query);

  result
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

// Read and show api End




  // Delete product api start

ProductRouter.delete(
    "/delete/:id",
    adminAuth,
    (req,res)=>{
        const result=new ProductController().deleteProduct(req.params.id);

        result.then(
            (success)=>{
                res.send(success);
            }
        ).catch(
            (error)=>{
             console.log(error);
             res.send(error)
            }
        )
    }
)


  // Delete product api End



//   Status stock topSelling api start


ProductRouter.patch(
    "/update/:id",
  adminAuth,
    (req,res)=>{
    const result=new ProductController().updatedSST(req.params.id,req.body.flag);

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

//   Status stock topSelling api End


// MultipleImages Api start


ProductRouter.post(
    "/multipleimage/:id",


        filesUpload(
            {
                createParentPath:true
            }
        ),   
    


    (req,res)=>{

      

        const result=new ProductController().multipleImages(req.params.id, req.files?.other_image);

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



// MultipleImages Api End




// Edit Product api start


ProductRouter.put(
    "/edit/:id",
 
    [
adminAuth,
        filesUpload(
                {
                    createParentPath:true
                }
            ),
    ],
    
            

    
    (req,res)=>{
         const result=new ProductController().editProduct(req.params.id,req.body,req.files?.main_image);
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


// Edit Product api End





module.exports=ProductRouter;