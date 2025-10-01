const { generateCategoryImageName } = require("../helping");
const CategoryModel = require("../Models/CategoryModel");
const ProductModel = require("../Models/ProductModel");

class CategoryController {
  
  create(data, files) {
    return new Promise((resolve, reject) => {
      try {        
                 
        const newGenerateImageName = generateCategoryImageName(files.name);
        const destination = "./Public/Images/Category/" + newGenerateImageName;

        files.mv(destination, (error) => {
          if (error) {
            reject({
              msg: "Category not Created due to image upload",
              status: 0,
            });
          } else {
            if (data.CategoryName && data.CategorySlug) {
              const Category = new CategoryModel({
                ...data,
                CategoryImageName: newGenerateImageName,
              });

              Category.save()
                .then((success) => {
                  resolve({
                    msg: "Category Created Successfully",
                    status: 1,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  reject({
                    msg: "Category Not Created",
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
        reject({
          msg: "Internal Server error",
          status: 0,
        });
      }
    });
  }

  readShow(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let category;

        if (id) {
          category = await CategoryModel.findById(id);
          resolve({
            msg: "Category Found",
            status: 1,
            category,
          });
        } else {
          category = await CategoryModel.find().sort({ createdAt: 1 });



          const data = [];    

          const allPromises = category.map(async (cat) => {
            const productCount = await ProductModel.find({
              category_id: cat._id,
            }).countDocuments();
            data.push({ ...cat.toJSON(), productCount });
          });
          
          await Promise.all(allPromises);
          


          resolve({
            msg: "Category Found",
            status: 1,
            category: data,
          });
        }
      } catch (error) {
        console.log(error);
        reject({
          msg: "Internal Server error",
          status: 0,
        });
      }
    });
  }

  status(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const categoryStatusUpdate = await CategoryModel.findById(id);

        CategoryModel.updateOne(
          {
            _id: id,
          },
          {
            $set: {
              CategoryStatus: !categoryStatusUpdate.CategoryStatus,
            },
          }
        )
          .then((success) => {
            if (categoryStatusUpdate.CategoryStatus == false) {
              resolve({
                msg: "Status Activate",
                status: 1,
              });
            } else {
              resolve({
                msg: "Status Deactivate",
                status: 1,
              });
            }
          })
          .catch((error) => {
            console.log(error);
            reject({
              msg: "Category Status Not Updated ",
              status: 0,
            });
          });
      } catch (error) {
        reject({
          msg: "Internal Server error",
          status: 0,
        });
      }
    });
  }

  deleteCategory(id) {
    return new Promise((resolve, reject) => {
      try {
        CategoryModel.deleteOne({ _id: id })
          .then((success) => {
            resolve({
              msg: "Category Deleted Successfully",
              status: 1,
            });
          })
          .catch((error) => {
            reject({
              msg: "Category not Deleted ",
              status: 0,
            });
          });
      } catch (error) {
        reject({
          msg: "Internal Server error",
          status: 0,
        });
      }
    });
  }

  editCategory(data, id, files) {
    return new Promise((resolve, reject) => {
      try {
        if (files) {
          const newGenerateImageName = generateCategoryImageName(files.name);
          const destination =
            "./Public/Images/Category/" + newGenerateImageName;

          files.mv(destination, (error) => {
            if (error) {
              console.log(error);
              reject({
                msg: "Category not updated due to image upload",
                status: 0,
              });
            } else {
              CategoryModel.updateOne(
                { _id: id },
                {
                  $set: {
                    CategoryName: data.CategoryName,
                    CategorySlug: data.CategorySlug,
                    CategoryImageName: newGenerateImageName,
                  },
                }
              )
                .then((success) => {
                  resolve({
                    msg: "Category Updated",
                    status: 1,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  reject({
                    msg: "Category not Updated ",
                    status: 0,
                  });
                });
            }
          });
        } else {
          CategoryModel.updateOne(
            { _id: id },
            {
              $set: {
                CategoryName: data.CategoryName,
                CategorySlug: data.CategorySlug,
              },
            }
          )
            .then((success) => {
              resolve({
                msg: "Category Updated",
                status: 1,
              });
            })
            .catch((error) => {
              console.log(error);
              reject({
                msg: "Category not Updated ",
                status: 0,
              });
            });
        }
      } catch (error) {
        console.log(error);
        reject({
          msg: "Internal Server error",
          status: 0,
        });
      }
    });
  }
}

module.exports = CategoryController;
