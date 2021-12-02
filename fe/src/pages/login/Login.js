import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { withRouter } from 'react-router'
import '../../util/colors.scss'
import './login.scss'
import { loginUser, UserContext } from '../../contexts/userContext'



export default function Login() {

    const { user, setUser } = useContext(UserContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [submit, setSubmit] = useState(false)
    const [loginError, setLoginError] = useState(false)

    useEffect(() => {
        async function login() {
            console.log("username: " + username)
            console.log("password: " + password)
            let res = await loginUser(username, password)
            console.log("login response: ", res)
            if (res) {
                console.log("login successful")
                setLoginError(false)
                setUser(res)
                window.location = "/"
            } else {
                console.log("login failed")
                setLoginError(true)
            }
            setSubmit(false)
        }

        if (submit) {
            login()
        }
    }, [submit])

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <div className="login-title">
                    <h1>Admin Login</h1>
                </div>
                { loginError == true && 
                    <div className="login-error">
                        Login Failed {loginError}
                    </div>
                }
                <div className="login-form">
                    {/* <form> */}
                        <div className="row">
                            <label for="username">Username</label>
                            <input type="text" id="username" onChange={event => setUsername(event.target.value)} />
                        </div>
                        <div className="row">
                            <label for="password">Password</label> 
                            <input type="password" id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={event => setPassword(event.target.value)} />
                        </div>
                        <div className="submit-button-container">
                            <button className="submit-button" onClick={() => setSubmit(() => !submit) }>Login</button>
                        </div>
                    {/* </form> */}
                </div>

            </div>
        </div>
    )
}
