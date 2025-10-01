const ColorModel = require("../Models/ColorModel")

class ColorController {






// create color view and read End


    createApi(data){
        return new Promise(
            (resolve,reject)=>{
                try {


                    if (!data.ColorName || !data.ColorSlug || !data.ColorPickerName) {
                        return reject({
                            msg: "All fields (ColorName, ColorSlug, ColorPickerName) are required",
                            status: 0
                        });
                    }else{

                    const ColorCreate=new ColorModel(
                        {
                             ...data
                        }
                    )

                    ColorCreate.save()
                    .then(
                        (success)=>{
                             resolve(
                                {
                                    msg:"Color Created Successfully",
                                    status:1
                                }
                             )
                        }
                    ).catch(
                        (error)=>{
                            console.log(error);
                            reject(
                                {
                                    msg:"Color not created",
                                    status:0
                                }
                            )

                        }
                    )
                    
                }
                   
                   
                    
                } catch (error) {
                    reject({
                        msg: "Internal Server error",
                        status: 0,
                      });
                }
            }
        )
    }


// create color view and read start

read(id){
    return new Promise(
       async (resolve,reject)=>{
            try {

                let colorGet;
                if(id){

                    colorGet=await ColorModel.findById(id);
                }else{

                    colorGet=await ColorModel.find();
                }
                
                resolve(
                    {
                        msg: Array.isArray(colorGet) ? colorGet.length + "Color Found"  : 1 + "Color Found",
                        status:1,
                        colorGet
                    }
                )
             



            } catch (error) {
                console.log(error);
                reject({
                        msg: "Internal Server error",
                        status: 0,
                      });
            }
        }
    )

}


// create color view and read End


// Create status updated start

statusChange(id){
return new Promise(
   async (resolve,reject)=>{
        try {


            const colorStatusUpdate=await ColorModel.findById(id);

            if(colorStatusUpdate){
                ColorModel.updateOne(
                    {
                        _id:id
                    },
                    {
                        $set:{
    
                            ColorStatus:!colorStatusUpdate.ColorStatus
                        }
                    }
                ).then(
                    (success)=>{

                     


 
                            
            if(colorStatusUpdate.ColorStatus==false){
                resolve(
                  {
                    msg:"Status Activate",
                    status:1
                  }
                )
              } else{
                resolve(
                  {
                    msg:"Status Deactivate",
                    status:1
                  }
                )
              }
                      
    
                    }
                ).catch(
                    (error)=>{
                        reject(
                            {
                                msg:"Color status not updated",
                                status:0
                            }
                        )
                    }
                )
    
            } 

           
            
        } catch (error) {
            reject(
                {
                    msg:"Internal server error",
                    status:0
                }
            )
        }
    }
)
}


// Create status updated End


// Create delete start

deleteColor(id){
    return new Promise(
        (resolve,reject)=>{
            try {

                ColorModel.deleteOne({_id:id})
                .then(
                    (success)=>{
                        resolve(
                            {
                                msg:"Color deleted successfully",
                                status:1
                            }
                        )
                    }
                ).catch(
                    (error)=>{
                        reject(
                            {
                                msg:"Color not deleted ",
                                status:0
                            }
                        )
                    }
                )


                
            } catch (error) {

                reject(
                    {
                        msg:"Internal server error",
                        status:0
                    }
                )
                
            }
        }
    )
}


// Create delete End





// Create edit updated start

editColor(id,data){
    return new Promise(
       async (resolve,reject)=>{
            try {
                

                const colorEdit=await ColorModel.findById(id);

                ColorModel.updateOne(
                    {
                        _id:id
                    },
                    {
                        $set:{
                            ColorName:data.ColorName,
                            ColorSlug:data.ColorSlug,
                            ColorPickerName:data.ColorPickerName
                            
                        }
                    }
                ).then ( 
                    (success)=>{
                        resolve(
                            {
                                msg:"Color updated successfully",
                                status:1
                            }
                        )
                    }
                ).catch(
                    (error)=>{
                        reject(
                            {
                                msg:"Color not updated",
                                status:0
                            }
                        )
                    }
                )




            } catch (error) {

                reject(
                    {
                        msg:"Internal server error",
                        status:0
                    }
                )
                
            }
        }
    )
}



// Create edit updated End


}


module.exports=ColorController;