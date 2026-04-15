import React from 'react'

const Login = () => {
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>

            <form>
                <div className="input-group">
                    <label htmlFor="email"></label>
                    <input type="email" id='email' name='email' placeholder='Enter Email' />
                </div>
                <div className="input-group">
                    <label htmlFor="password"></label>
                    <input type="password" id='password' name='password' placeholder='Enter Password' />
                </div>
            </form>
        </div>
    </main>
  )
}

export default Login