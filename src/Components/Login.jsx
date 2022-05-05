import axios from "axios";
import React, { useState } from "react";
const LoginModal = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        }
        axios.post('http://127.0.0.1:8000/api/login', data)
            .then(res => {
                localStorage.setItem('token', res.data.access_token)
                props.showCalendar()
                props.isChange()
            })
            .catch(err => {
                console.log(err)
                alert('email, password wrog')
            })
    }
    return (
        <div className="container">
            <div className="modalLogin">
                <div className="showTask">
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control" id="exampleInputPassword1"></input>
                        </div>
                        <button type="submit" className="btn btn-secondary btn-100 w-100 mt-5">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default LoginModal;