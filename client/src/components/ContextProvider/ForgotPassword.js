import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const ForgotPassword = () => {
  const {id , token} = useParams();
const history = useNavigate();

const [password , setPassword] = useState("");
const [message , setMessage] = useState('')

const userValid = async()=>{
  const res = await fetch(`http://localhost:8989/forgotpassword/${id}/${token}`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json"
    }
  });

  const data = await res.json()

  if(data.status === 201){
    console.log("user valid");
  }else{
    history("*")
  }
  
}

const setValue =(e)=>{
setPassword(e.target.value)
}

const sendPassword =async(e)=>{
e.preventDefault();


const res = await fetch(`http://localhost:8989/${id}/${token}`,{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({password})
});

const data = await res.json()

if(data.status == 201){
  setPassword("")
  setMessage(true)
}else{
  toast.error("! Token Expired Generate new link")
}
}

useEffect(()=>{
  userValid()
},[])


  return (
   <>
   <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h1>Enter Your New Password</h1>
                    </div>
                    
                    <form>
                        <div className='form_input'>
                            <label htmlFor='password'>New Password</label>
                            <input type='password' name='password' id='password' value={password} onChange={setValue} placeholder='Enter your new password'></input>
                        </div>
                        <button className='btn' onClick={sendPassword}>Send</button>
                    </form>
                    <ToastContainer />

                </div>

            </section>
   </>
  )
}

export default ForgotPassword