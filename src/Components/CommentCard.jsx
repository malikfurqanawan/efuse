import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/index.css'
import Avatar from '../assets/person.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { apiService, updateComment } from '../redux/actions'
import moment from 'moment'

const CommentCard = ({ comment }) => {
    const currentUser = useSelector(state => state.currentUser)
    const [editComment, setEditComment] = useState(false)
    const [text, setText] = useState("")
    const dispatch = useDispatch()

    const handleSubmitOnEditComment = event => {
        event.preventDefault()
        apiService('PATCH', '/comments/' + comment._id, {
            text: text
        })
            .then(response => {
                dispatch(updateComment(response.data.data))
                setEditComment(false)
            })
    }
    const handleOnEditComment = () => {
        setText(comment.text)
        setEditComment(true)
    }

    const handleLike = () => {
        apiService('PATCH', '/comments/like/' + comment._id, null)
            .then(response => {
                dispatch(updateComment(response.data.data))
            })
    }
    const handleDelete = () => {
        apiService('DELETE', '/comments/' + comment._id, null)
            .then(response => {
                dispatch(updateComment(response.data.data))
            })
    }

    const CommentView = () => {
        return (
            <>
                {
                    editComment ?
                        (
                            <form onSubmit={handleSubmitOnEditComment}>
                                <input
                                    type="text"
                                    key={comment._id}
                                    className='comment-input'
                                    placeholder="Write your comment?"
                                    value={text}
                                    onChange={(event) => setText(event.target.value)}
                                    required
                                />
                            </form>
                        ) :
                        <p className='comment-text'>{comment.text}</p>
                }
            </>
        )
    }

    return (
        <div className="p-2 row">
            <div className='col-2 d-flex justify-content-center align-items-center'>
                <div className='user-comment-img-con'>
                    <img src={Avatar} alt="" />
                </div>
            </div>
            <div className='col-10 comment-card'>
                <p className='comment-time'>{moment(comment.createdAt).toNow(true)}</p>
                <p className='comment-name'>{comment.user.firstName} {comment.user.lastName}</p>
                <p className='comment-profession'>Professional Student</p>
                {CommentView()}
                <div className='d-flex mt-2'>
                    <p className='likes-text'>{comment.likes.length} Likes |</p>
                    <button
                    className={comment.likes.includes(currentUser._id) ? 'no-bg-btn color-red' : 'no-bg-btn'}
                    onClick={handleLike}
                >
                    <FontAwesomeIcon icon="heart" /> Like
                </button>
                    {
                        currentUser._id === comment.user._id ?
                        (
                            <>
                                <p>|</p>
                                <button className='no-bg-btn' onClick={handleOnEditComment}>
                                    <FontAwesomeIcon icon="edit" /> Edit
                                </button>
                                <p>|</p>
                                <button className='no-bg-btn' onClick={handleDelete}>
                                    <FontAwesomeIcon icon="trash" /> Delete
                                </button>
                            </>
                        ) :
                        <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default CommentCard