const { encryptPassword, decryptPassword, accessToken } = require("../helping");
const AdminModel = require("../Models/AdminModel");

class AdminController{

// register created api
    create(data){
           return new Promise(
            async(resolve,reject)=>{
                try {

                    if(!data.name ||!data.email || !data.password || !data.phone){
                        reject(
                            {
                                msg:"Please provide all required  fields",
                                status:0
                            }
                        )
                        return

                    }


                const checkEmail=await AdminModel.findOne({email:data.email})


                if(checkEmail){
                    reject(
                        {
                            msg:"Email already exist",
                            status:0
                        }
                    )

                }else{

                    const admin=new AdminModel(
                        {
                            ...data,
                            password:encryptPassword(data.password)
                        }
                    )


                    admin.save().then(
                        (success)=>{

                            resolve(
                                {
                                    msg:"Admin created successfully",
                                    status:1
                                }
                            )                                                               

                        }
                    ).catch(
                        (error)=>{
                            reject(
                                {
                                    msg:"Admin not created",
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

// register created End


//   login created api 
    login(data){
        return new Promise(
            async(resolve,reject)=>{
                try{

                    const admin=await AdminModel.findOne({email:data.email})

                    if(admin){

                        if(data.password == decryptPassword(admin.password)){
                            resolve(
                                {
                                    msg:"Login Successfully",
                                    status:1,
                                    admin:{...admin.toJSON(),password:null},
                                    token:accessToken(admin.toJSON())
                                }
                            )

                        }else{
                            reject(
                                {
                                    msg:"Password  Incorrect",
                                    status:0
                                }
                            )
                        }

                    }else{
                        reject(
                            {
                                msg:"Email not found",
                                status:0
                            }
                        )
                    }


                }
                catch(error){

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
//   login created End 
   


}


module.exports=AdminController;