import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment, apiService } from '../redux/actions'

import '../styles/index.css'

import Avatar from '../assets/person.jpg'

export default function CommentForm({post}) {
    const [text, setText] = useState("")
    const dispatch = useDispatch()

    const handleOnSubmit = event => {
        event.preventDefault()
        apiService('POST', '/comments', {
            text: text,
            postId: post._id
        })
        .then(response => {
            dispatch(addComment(response.data.data))
            setText("")
        })
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <div className="p-2 row">
                    <div className='col-1'>
                        <div className='user-comment-img-con'>
                            <img src={Avatar} alt="" />
                        </div>
                    </div>
                    <div className='col-11'>
                        <input
                            className='comment-input'
                            placeholder="Write your comment?"
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            required
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}