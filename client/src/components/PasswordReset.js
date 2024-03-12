import React from 'react'

const PasswordReset = () => {
  return (
    <>
     <section>
            <div className='form_data'>
                <div className='form_heading'>
                    <h1>Enter Your Email</h1>
                </div>
                <form>
                    <div className='form_input'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email'  placeholder='Enter your email address'></input>
                    </div>
                   

                    <button className='btn' >Login</button>
                    {/* <p>Don't have Account ? <NavLink to='/register'>Sign Up</NavLink></p> */}
                    {/* <p style={{color:"black" , fontWeight:"bold"}}>Forgot Password ? <NavLink to='/password-reset'>Click Here</NavLink></p> */}
                    
                </form>
            </div>
        </section>
    </>
  )
}

export default PasswordReset