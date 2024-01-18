import React ,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Config";

function SignUp() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  function createUser(event) {
    event.preventDefault();
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/')
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
  }
  return (
    <>
          <div>
              <div>
                  <h1>
                      Sign Up
                  </h1>
                  <form onSubmit={createUser}>
                      <div>
                          <label>
                              <span>Email</span>
                          </label>
                          <input type="text" placeholder="Email Address" onChange={(e) => { setEmail(e.target.value) }} required />
                      </div>
                      <div>
                          <label>
                              <span>Password</span>
                          </label>
                          <input type="password" placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} required />
                      </div>
                      <div>
                          <button type="submit">{loading ? <button></button> : 'Sign in'}</button>
                      </div>
                  </form>
              </div>
          </div>

    </>
  );
}

export default SignUp;