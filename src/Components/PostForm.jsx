import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPost, apiService } from '../redux/actions'

import '../styles/index.css'

import Avatar from '../assets/person.jpg'

export default function NewPostForm() {
    const [text, setText] = useState("")
    const dispatch = useDispatch()

    const handleOnSubmit = event => {
        event.preventDefault()
        apiService('POST', '/posts', { text: text })
            .then(response => {
                dispatch(addPost(response.data.data))
                setText("")
            })
    }

    return (
        <div className="post-con">
            <form onSubmit={handleOnSubmit}>
                <div className="p-2 row">
                    <div className='col-2'>
                        <div className='user-post-img-con'>
                            <img src={Avatar} alt="" />
                        </div>
                    </div>
                    <div className='col-10'>
                        <textarea
                            className='post-input'
                            placeholder="What is on your mind?"
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            required
                        >
                        </textarea>
                    </div>
                </div>
                <hr />
                <div className='d-flex justify-content-between px-2 pb-2'>
                    <button type='button' className='attachment-btn'>Photo / Video</button>
                    <button type='submit' className='theme-btn'>Post It</button>
                </div>
            </form>
        </div>
    )
}