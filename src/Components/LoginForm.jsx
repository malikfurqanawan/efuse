import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { apiService, userLogin } from '../redux/actions'

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMessage, setErrorMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        apiService('POST', '/users/login', {
            email: email,
            password: password
        })
        .then(response => {
            dispatch(userLogin(response.data.data))
            navigate('/posts')
            setEmail('')
            setPassword('')
        })
        .catch(error => {
            if(error.response.data.errMessage) {
                setErrorMessage(error.response.data.errMessage)
            }  
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="auth-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => {
                    setErrorMessage('')
                    setEmail(event.target.value)}
                }
                required
            />
            <input
                className="auth-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => {
                    setErrorMessage('')
                    setPassword(event.target.value)}
                }
                required
            />
            <p className='error-message'>{errMessage}</p>
            <div className='text-right'>
                <button className="theme-btn">Login</button>
            </div>
            <div className='text-center'>
                <hr />
                <p>OR</p>
                <button type='button' className='attachment-btn' onClick={ () => navigate('/register')}>Register</button>
            </div>
        </form>
    )
}

export default LoginForm