const mongoose=require("mongoose");

const CategorySchema=new mongoose.Schema(
    {
        CategoryName:{
            type:String,
            required:true,
            unique:true
        },
        CategorySlug:{
            type:String,
            required:true,
            unique:true
        },
        CategoryImageName:{
            type:String,
            default:null
        },
        CategoryStatus:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps:true
    }
)


const CategoryModel=mongoose.model("categories",CategorySchema);


module.exports=CategoryModel


