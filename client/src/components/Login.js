import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Mix.css'

const Login = () => {
    const [passShow, setPassShow] = useState(false);
    const [inpvalue, setInpvalue] = useState({
        email: "",
        password: ""
    })

    const history = useNavigate();

    const setValue = (e) => {
        const { name, value } = e.target;

        setInpvalue(() => {
            return {
                ...inpvalue,
                [name]: value
            }
        })
    };

    const loginuser = async (e) => {
        e.preventDefault()

        const { email, password } = inpvalue;
        if (email === "") {
            alert("please enter your email")
        } else if (!email.includes("@")) {
            alert("please enter vaild email ")
        } else if (password === "") {
            alert("please enter your password")
        } else if (password.length < 6) {
            alert("password must be 6 char")
        } else {
            // alert("Register completed")

            const data = await fetch("http://localhost:8989/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });

            const res = await data.json();
            // console.log(res);

            if (res.status === 201) {
                // alert("User Login done");
                // console.log(res.result.token);
                localStorage.setItem("usersdata", res.result.token)
                history("/dash")
                setInpvalue({ ...inpvalue, email: '', password: '' })
            }

        }

    }

    return (
        <section>
            <div className='form_data'>
                <div className='form_heading'>
                    <h1>Welcome back..... Log in</h1>
                    <p>Hi , we are glad you are back . Please Login</p>
                </div>
                <form>
                    <div className='form_input'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' value={inpvalue.email} onChange={setValue} placeholder='Enter your email address'></input>
                    </div>
                    <div className='form_input'>
                        <label htmlFor='password'>Password</label>

                        <div className='two'>
                            <input type={!passShow ? "password" : "text"} name='password' id='password' value={inpvalue.password} onChange={setValue} placeholder='Enter your password'

                            />
                            <div className='showpass' onClick={() => setPassShow(!passShow)}>
                                {!passShow ? "Show" : "Hide"}
                            </div>
                        </div>
                    </div>

                    <button className='btn' onClick={loginuser}>Login</button>
                    <p>Don't have Account ? <NavLink to='/register'>Sign Up</NavLink></p>
                    <p style={{color:"black" , fontWeight:"bold"}}>Forgot Password ? <NavLink to='/password-reset'>Click Here</NavLink></p>
                    
                </form>
            </div>
        </section>
    )
}

export default Login