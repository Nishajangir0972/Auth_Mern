import express from "express";
import userdb from '../models/userSchema.js'
import bcrypt from 'bcryptjs'
import authenticate from "../middleware/authenticate.js";
// import cookieParser from "cookie-parser";
import nodemailer from 'nodemailer'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


const SecretKey = "nishajangirSampatdeviSunilJangir"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

const userRouter = new express.Router();

userRouter.post("/register", async (req, res) => {
    const { fname, email, password, cpassword } = req.body;

    try {
        if (!fname || !email || !password || !cpassword) {
            return res.status(422).json({ error: "Fill in all the details" });
        }

        const preuser = await userdb.findOne({ email: email });
        if (preuser) {
            return res.status(422).json({ error: "This email is already in use" });
        }

        if (password !== cpassword) {
            return res.status(422).json({ error: "Password and confirm password do not match" });
        }

        const finalUser = new userdb({
            fname, email, password, cpassword
        });

        const storeData = await finalUser.save();
        // console.log(storeData);

        return res.status(201).json({ status: 201, storeData });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


userRouter.post("/login", async (req, res) => {
    // console.log(req.body);
    const { email, password, } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "Fill in all the details" });
    }

    try {
        const userValid = await userdb.findOne({ email: email });
        if (userValid) {
            const isMatch = await bcrypt.compare(password, userValid.password)

            if (!isMatch) {
                res.status(422).json({ error: "invalid details" });
            } else {
                //token generate
                const token = await userValid.generateAuthtoken();
                // console.log(token);

                res.cookie("usercookie", token, {
                    expires: new Date(Date.now() + 9000000),
                    httpOnly: true
                })

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({ status: 201, result })
            }
        }

    } catch (error) {
        res.status(401).json(error)
        console.log("catch block");
    }


})


userRouter.get("/validuser", authenticate, async (req, res) => {
    try {
        const ValidUserOne = await userdb.findOne({ _id: req.userId });
        res.status(201).json({ status: 201, ValidUserOne });

    } catch (error) {
        res.status(401).json({ status: 401, error });
        console.log("errrrr");
    }
});


userRouter.get("/logout", authenticate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });
        res.clearCookie("usercookie", { path: "/" });
        req.rootUser.save();

        res.status(201).json({ status: 201 })
    } catch (error) {
        res.status(201).json({ status: 401, error })
    }
});


userRouter.post("/sendpasswordlink", async (req, res) => {
    console.log(req.body);

    const { email } = req.body;

    if (!email) {
        res.status(401).json({ status: 401, message: "Enter Your Email" })
    }

    try {
        const userfind = await userdb.findOne({ email: email });
        // console.log("userfind" , userfind);

        const token = jwt.sign({ _id: userfind._id }, SecretKey,
            { expiresIn: "1h" }
        )
        // console.log(token);

        const setusertoken = await userdb.findByIdAndUpdate({ _id: userfind._id }, { verifytoken: token }, { new: true });
        // console.log("setusertoken" , setusertoken);
        if (setusertoken) {
            const mailOptions = {
                from: "nishajangir9302@gmail.com",
                to: email,
                subject: "Sending Email For password Reset",
                text: `This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error", error);
                    res.status(401).json({ status: 401, message: "email not send" })
                } else {
                    console.log("Email sent", info.response);
                    res.status(201).json({ status: 201, message: "Email sent Successfully" })
                }
            })
        }

    } catch (error) {
        res.status(401).json({ status: 401, message: "Invalid User" })
    }
});

userRouter.get("/forgotpassword/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    // console.log(id , token);

    try {
        const validuser = await userdb.findOne({ _id: id, verifytoken: token })
        // console.log(validuser);
        const verifyToken = jwt.verify(token, SecretKey);
        console.log(verifyToken);

        if (validuser && verifyToken._id) {
            res.status(201).json({ status: 201, validuser })
        } else {
            res.status(401).json({ status: 401, error })
        }
    } catch (error) {

    }
})


userRouter.post("/:id/:token", async (req, res) => {
    const { id, token } = req.params;

    const { password } = req.body;

    try {
        const validuser = await userdb.findOne({ _id: id, verifytoken: token });

        const verifyToken = jwt.verify(token.SecretKey);

        if (validuser && verifyToken._id) {
            const newpassword = await bcrypt.hash(password, 12);

            const setnewuserpass = await userdb.findByIdAndUpdate({ _id: id }, { password: newpassword })
            setnewuserpass.save();

            res.status(201).json({ status: 201, setnewuserpass })
        } else {
            res.status(401).json({ status: 401, message: "user not exist" })
        }
    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
})
export default userRouter