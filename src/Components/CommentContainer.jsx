import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/index.css'
import { apiService, setPosts } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import CommentForm from './CommentForm'
import CommentCard from './CommentCard'

const CommentContainer = ({ post }) => {
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()

    const handleLike = () => {
        apiService('PATCH', '/posts/like/' + post._id, null)
            .then(response => {
                dispatch(setPosts(response.data.data))
            })
    }
    return (
        <div className='comment-con'>
            <div className='d-flex'>
                <button
                    className={post.likes.includes(currentUser._id) ? 'no-bg-btn color-red' : 'no-bg-btn'}
                    onClick={handleLike}
                >
                    <FontAwesomeIcon icon="heart" /> Like
                </button>
                <button className='no-bg-btn'>
                    <FontAwesomeIcon icon="comment" /> Comment
                </button>
            </div>
            <CommentForm post={post} />
            {
                post.comments.map((comment, index) => (
                    <CommentCard comment={comment} key={index} />
                ))
            }
        </div>
    )
}

export default CommentContainer