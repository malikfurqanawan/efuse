import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import LoginForm from '../Components/LoginForm'
import '../styles/index.css'

const Login = () => {
    const currentUser = useSelector(state => state.currentUser)
    const navigate = useNavigate()
    if (currentUser && currentUser.email) {
        navigate('/posts')
    }
    return (
        <div>
            <div className="row">
                <div className="col-lg-3 d-none d-lg-block d-xl-block bg-con h-100"></div>
                <div className="col-lg-6 col-md-12 col-sm-12 p-0 h-100 content-con d-flex justify-content-center align-items-center">
                    <div className='auth-con'>
                        <div className='text-center'>
                            <h3>Efuse</h3>
                            <p>Login to Efuse<sup>Platform</sup></p>
                        </div>
                        <LoginForm />
                    </div>
                </div>
                <div className="col-lg-3 d-none d-lg-block d-xl-block bg-con h-100"></div>
            </div>
        </div>
    )
}

export default Login