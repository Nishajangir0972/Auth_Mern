import mongoose from "mongoose"

const DB = "mongodb+srv://nishajangir9302:nisha0972@cluster0.inlqcvf.mongodb.net/Authuser?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(DB ,{
    useUnifiedTopology :  true,
    useNewUrlParser : true
}).then(()=>
    console.log("Database Connected")).catch((error)=>{
        console.log(error)
    })