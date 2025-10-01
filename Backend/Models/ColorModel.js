const mongoose =require("mongoose");

const ColorSchema=new mongoose.Schema
(
    {
        ColorName:{
            type:String,
            required:true,
            unique:true
        },
        ColorSlug:{
            type:String,
            required:true,
            unique:true
        },
        ColorPickerName:{
              type:String,
              required:true,
              unique: true, 
              trim: true    // trim: true जोड़ें, ताकि अनावश्यक spaces हट जाएँ।
        },
        ColorStatus:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps:true
    }

)

const ColorModel= mongoose.model("colors",ColorSchema);

module.exports = ColorModel;