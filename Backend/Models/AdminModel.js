const mongoose=require("mongoose")


const AdminLoginSchema=new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength:5
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match:[/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
        },
        password: {
            type: String,
            required: true,
            minLength:6
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            minLength:10
        },
        role: {
            type: Boolean,
            default: false
        }
    },

    {
        timestamps:true
    }
)


const AdminModel=new mongoose.model("admin",AdminLoginSchema);

module.exports=AdminModel;