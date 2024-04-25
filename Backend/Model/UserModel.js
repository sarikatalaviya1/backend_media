const { default: mongoose } = require("mongoose");

class UserModel{
 constructor(){
        this.schema=new mongoose.Schema({
                username:{
                    type:String,
                    require:true
                },
                email:{
                    type:String,
                    require:true,
                    unique:true
                },
                password:{
                    type:String,
                    require:true
                }
                ,confirmPassword:{
                    type:String,
                    require:true
                }
        } ,{
            timestamps:true
        })
        this.model=mongoose.model('user',this.schema)
        
    }
}
const userModel=new UserModel()
module.exports=userModel