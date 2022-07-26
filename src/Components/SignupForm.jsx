import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { userSignup, apiService } from '../redux/actions'

const SignupForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMessage, setErrorMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrorMessage('')
        apiService("POST", "/users", {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            userName: userName
        })
            .then((response) => {
                dispatch(userSignup(response.data.data))
                setEmail('')
                setFirstName('')
                setLastName('')
                setPassword('')
                setUsername('')
                navigate('/posts')
            })
            .catch((error) => {
                const result = error.response.data;
                if (result.errMessage) {
                    setErrorMessage(result.errMessage)
                }
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="auth-input"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
            />
            <input
                className="auth-input"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
            />
            <input
                className="auth-input"
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(event) => setUsername(event.target.value)}
                required
            />
            <input
                className="auth-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
            />
            <input
                className="auth-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
            />
            <p className='error-message'>{errMessage}</p>
            <div className='text-right'>
                <button className="theme-btn">Signup</button>
            </div>
            <div className='text-center'>
                <hr />
                <p>OR</p>
                <button type='button' className='attachment-btn' onClick={() => navigate('/')}>Already a member!</button>
            </div>
        </form>
    )
}

export default SignupForm