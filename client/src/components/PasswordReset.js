import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const PasswordReset = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const setValue = (e) => {
        setEmail(e.target.value)
    }

    const sendLink = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:8989/sendpasswordlink", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        const data = await res.json()
        if (data.status === 201) {
            setEmail("")
            setMessage("")
        } else {
            toast.error("Invalid User", {
                position: "top-center"
            })
        }


    }


    return (
        <>
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h1>Enter Your Email</h1>
                    </div>
                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>Your password link has been send on your email</p> : ""}
                    <form>
                        <div className='form_input'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' name='email' id='email' onChange={setValue} placeholder='Enter your email address'></input>
                        </div>
                        <button className='btn' onClick={sendLink} >Send</button>
                    </form>
                    <ToastContainer />

                </div>

            </section>

        </>
    )
}

export default PasswordReset