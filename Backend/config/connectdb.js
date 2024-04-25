const {mongoose}=require('mongoose')
async function Connectdb(){
   try {
    
        await mongoose.connect("mongodb://127.0.0.1:27017/mediaplayer")
        console.log("DB cONNECT")
   } catch (error) {

        console.log(error)
   }
}
module.exports=Connectdb