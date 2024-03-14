import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

const SecretKey = "nishajangirSampatdeviSunilJangir"


const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email")
            }

        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    verifytoken:{
        type:String,
    }

})



userSchema.pre("save" , async function(next){
    // console.log("this.password" , this.password);
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password , 12);
    this.cpassword = await bcrypt.hash(this.cpassword , 12);
}
    next()
})


userSchema.methods.generateAuthtoken = async function(){
    try {
        let token12 = jwt.sign({_id:this._id} , SecretKey,{
            expiresIn:"1d"
        });
        this.tokens = this.tokens.concat({token: token12});
        await this.save();
        return token12
    } catch (error) {
        res.status(422).json(error)
    }
}

const userdb = new mongoose.model("users", userSchema);

export default userdb