import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import axios from 'axios'
import './Mix.css'


const Register = () => {
    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);
    const [inpvalue, setInpvalue] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    })
    // console.log(inpvalue);

    const setValue = (e) => {
        const { name, value } = e.target;

        setInpvalue(() => {
            return {
                ...inpvalue,
                [name]: value
            }
        })
    };

    const addUserDetails = async (e) => {
        e.preventDefault();

        const { fname, email, password, cpassword } = inpvalue;
        if (fname === "") {
            alert("please enter your name")
        } else if (email === "") {
            alert("please enter your email")
        } else if (!email.includes("@")) {
            alert("please enter vaild email ")
        } else if (password === "") {
            alert("please enter your password")
        } else if (password.length < 6) {
            alert("password must be 6 char")
        }
        else if (cpassword === "") {
            alert("please enter your confirm password")
        } else if (cpassword.length < 6) {
            alert("confirm password must be 6 char")
        } else if (password !== cpassword) {
            alert("password and confirm password not match")
        } else {

            const data = await fetch("http://localhost:8989/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, cpassword
                })
            });

            const res = await data.json();
            // console.log(res);

            if(res.status === 201){
                alert("User registration done");
                setInpvalue({...inpvalue , fname:'' , email:'' , password:'', cpassword:''})
            }

        }
    }

    return (
        <section>
            <div className='form_data'>
                <div className='form_heading'>
                    <h1>Sign Up</h1>
                    <p style={{ textAlign: "center" }}>We are glad you are here . Please Sign Up !</p>
                </div>
                <form>
                    <div className='form_input'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' onChange={setValue} name='fname' id='name' value={inpvalue.fname} placeholder='Enter your name'></input>
                    </div>
                    <div className='form_input'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' onChange={setValue} name='email' id='email' value={inpvalue.email} placeholder='Enter your email address'></input>
                    </div>
                    <div className='form_input'>
                        <label htmlFor='password'>Password</label>

                        <div className='two'>
                            <input type={!passShow ? "password" : "text"} onChange={setValue} name='password' value={inpvalue.password} id='password' placeholder='Enter your password'

                            />
                            <div className='showpass' onClick={() => setPassShow(!passShow)}>
                                {!passShow ? "Show" : "Hide"}
                            </div>
                        </div>
                    </div>
                    <div className='form_input'>
                        <label htmlFor='password'>Confirm Password</label>

                        <div className='two'>
                            <input type={!cpassShow ? "password" : "text"} onChange={setValue} name='cpassword' id='cpassword' value={inpvalue.cpassword} placeholder='Confirm Password'

                            />
                            <div className='showpass' onClick={() => setCPassShow(!cpassShow)}>
                                {!cpassShow ? "Show" : "Hide"}
                            </div>
                        </div>
                    </div>
                    <button className='btn' onClick={addUserDetails}>Sign Up</button>
                    <p>Already Have a account ? <NavLink to='/'>LogIn</NavLink> </p>
                </form>
            </div>
        </section>
    )
}

export default Register