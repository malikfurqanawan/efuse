import React, { useEffect } from 'react'
import PostCard from '../Components/PostCard'
import PostForm from '../Components/PostForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import { apiService, logout, setPosts } from '../redux/actions'
import { useNavigate } from 'react-router-dom'

import '../styles/index.css'

const PostsContainer = () => {
    const currentUser = useSelector(state => state.currentUser)
    const posts = useSelector(state => state.posts)
    const navigate = useNavigate()
    if (!currentUser) {
        navigate('/')
    }
    const dispatch = useDispatch()
    useEffect(() => {
        apiService('GET', '/posts', null)
            .then(response => {
                dispatch(setPosts(response.data.data))
            })
    }, [dispatch])

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-3 d-none d-lg-block d-xl-block bg-con h-100"></div>
                <div className="col-lg-6 col-md-12 col-sm-12 p-0 h-100 content-con">
                    <div className="header">
                        <div className=''>
                            <button className='no-bg-btn float-right' onClick={handleLogout}>
                                <FontAwesomeIcon icon="power-off" />
                            </button>
                            <h2>Efuse</h2>
                        </div>
                        <hr />
                    </div>
                    <div className='px-3 scroll-y '>
                        <PostForm />
                        {posts.map(post => {
                            return <PostCard post={post} key={post._id} />
                        }
                        )}
                    </div>
                </div>
                <div className="col-lg-3 d-none d-lg-block d-xl-block bg-con h-100"></div>
            </div>
        </div>
    )
}

export default PostsContainer