

import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app, auth } from "./Config";
import { useState } from "react";
import './Styles/Login.css'

function Login() {


    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(true)

    const navigate = useNavigate()


    const handleSubmit = () => {
        if (!email == '' && !password == '') {
            setIsLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    navigate('/todo')
                })
                .catch((error) => {
                    setError(error.code)
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
                setIsLoading(false)
        }
        else {
            alert('both Email and Password is required')
            console.log('else');
            setIsLoading(false)
        }

    }

    return (
        <>
            <div className="box">
                <div className="box-main">
                    <h1 className="heading">Login</h1>
                    <input
                        type="text"
                        className='input'
                        placeholder='Enter your Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <br></br>
                    <input
                        type="password"
                        className='input'
                        placeholder='Enter your Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <br />
                    <p className="error">{error}</p>
                    <button className="btn" onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>

                </div>
            </div>
        </>
    )
}

export default Login