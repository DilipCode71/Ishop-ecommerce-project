const {generateCategoryImageName} = require("../helping");
const ProductModel = require("../Models/ProductModel");

const CategoryModel=require("../Models/CategoryModel")

class ProductController {
  // Create a and send products api start

  createApi(data, file) {
    return new Promise((resolve, reject) => {
      try {
        const newImagesGenerate = generateCategoryImageName(file.name);
        const destination = "./Public/Images/products/" + newImagesGenerate;

        file.mv(destination, (error) => {
          if (error) {
            reject({
              msg: "Products not Created due to image upload",
              status: 0,
            });
          } else {
            if (data.name && data.slug) {
              const products = new ProductModel({
                ...data,
                color: JSON.parse(data.color),
                main_image: newImagesGenerate,
              });

              products
                .save()
                .then((success) => {
                  resolve({
                    msg: "Product Created Successfully",
                    status: 1,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  reject({
                    msg: "Product not Created ",
                    status: 0,
                  });
                });
            } else {
              reject({
                msg: "All fields are required",
                status: 0,
              });
            }
          }
        });
      } catch (error) {
        console.log(error);
        reject({
          msg: "Internal server error",
          status: 0,
        });
      }
    });
  }

  // Create a and send products api End

  //    read and show products api start

  readShow(id, query) {
  return new Promise(async (resolve, reject) => {
    try {
      let newQuery = {};

      if (query.CategorySlug && query.CategorySlug !== "null") {
        const category = await CategoryModel.findOne({ CategorySlug: query.CategorySlug });
        if (!category) {
          return reject({ msg: "Category not found", status: 0 });
        }
        newQuery.category_id = category._id;
      }

      if (query.productColor && query.productColor !== "null") {
        newQuery.color = query.productColor;
      }

      let product;
      if (id) {
        product = await ProductModel.findById(id).populate(["category_id", "color"]);
      } else {
        product = await ProductModel.find(newQuery)
          .populate(["category_id", "color"])
          .limit(query.limit);
      }

      resolve({
        msg: "Product Found",
        status: 1,
        product: product || [],
      });
    } catch (error) {
      console.error(error);
      reject({ msg: "Internal server error", status: 0 });
    }
  });
}

  //    read and show products api End

  // Delete product api start

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      try {
        if (id) {
          ProductModel.deleteOne({ _id: id })
            .then((success) => {
              resolve({
                msg: "Product deleted successfully",
                status: 1,
              });
            })
            .catch((error) => {
              reject({
                msg: "Product not deleted ",
                status: 0,
              });
            });
        } else {
          reject({
            msg: "Product ID is missing",
            status: 0,
          });
        }
      } catch (error) {
        console.log(error);
        reject({
          msg: "Internal server error",
          status: 0,
        });
      }
    });
  }

  // Delete product api End

  // Status Update Status stock TopSelling api start

  updatedSST(id, flag) {
    return new Promise(async (resolve, reject) => {
      try {
        const productId = await ProductModel.findById(id);

        if (productId) {
          const productObj = {};
          if (flag == 1) {
            productObj.stock = !productId.stock;
          } else if (flag == 2) {
            productObj.status = !productId.status;
          } else if (flag == 3) {
            productObj.top_selling = !productId.top_selling;
          }

          ProductModel.updateOne(
            {
              _id: id,
            },
            {
              $set: productObj
            }
          )
            .then((success) => {
              resolve({
                msg: "Product status update",
                status: 1,
              });
            })
            .catch((error) => {
              console.log(error);
              reject({
                msg: "Unable to update product status",
                status: 0,
              });
            });
        } else {
          reject({
            msg: "Product not found with given ID",
            status: 0,
          });
        }
      } catch (error) {
        console.log(error);

        reject({
          msg: "Internal server error",
          status: 0,
        });
      }
    });
  }

  // Status Update Status stock TopSelling api End






  // MultipleImages api start here

  multipleImages(id,allFiles){
    return new Promise(
      async(resolve,reject)=>{

        try {
       
          const product=await ProductModel.findById(id)

          if(product){
          
            let currentImage=product.other_image
             
            const allNewFile=Array.isArray(allFiles) ? allFiles :[allFiles]

            for(let file of allNewFile){
              const newProductGenerate = generateCategoryImageName(file.name);
              currentImage.push(newProductGenerate)
              const destination = "./Public/Images/products/" + newProductGenerate;
              file.mv(destination)
            }

            ProductModel.updateOne(
              {
                _id:id
              },
              {
                $set:{
                   other_image:currentImage
                }
              }
            ).then(
              (success)=>{
                resolve(
                  {
                    msg:"Images Upload",
                    status:1
                  }
                )
              }
            ).catch(
              (error)=>{
                reject(
                  {
                    msg:"Images Not Upload",
                    status:0
                  }
                )
              }
            )





          }else{

            reject(
              {
                msg:"Product not found",
                status:0
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


  // MultipleImages api End here





  // Edit product Start here


  editProduct(id,data,file){
    return new Promise(
      (resolve,reject)=>{

        try {

          if (file) {


            const newProductImageName = generateCategoryImageName(file.name);
            const destination ="./Public/Images/products/" + newProductImageName;
  
            file.mv(destination, (error) => {
              if (error) {
                console.log(error);
                reject({
                  msg: "Product not updated due to image upload",
                  status: 0,
                });
              } else {
                ProductModel.updateOne(
                  { _id: id },
                  {
                    $set: {
                              ...data,
                              color: JSON.parse(data.color),
                              main_image: newProductImageName
                    },
                  }
                ) .then((success) => {
                    resolve({
                      msg: "Product Updated successfully",
                      status: 1,
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                    reject({
                      msg: "Product not Updated ",
                      status: 0,
                    });
                  });
              }
            });
          }  else {
            ProductModel.updateOne(
              { _id: id },
              {
                $set: {
                           ...data,
                              color: JSON.parse(data.color),
                           
                }
              }
            ).then((success) => {
              resolve({
                msg: "product Updated",
                status: 1,
              });
            })
            .catch((error) => {
              console.log(error);
              reject({
                msg: "Product not Updated ",
                status: 0,
              });
            });
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

  // Edit product End here
}

module.exports = ProductController;
