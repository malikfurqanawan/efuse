import React from 'react'
import '../styles/index.css'
import Avatar from '../assets/person.jpg'

import CommentContainer from './CommentContainer'

import moment from 'moment'

export default function PostCard({ post }) {
    
    return (
        <div className="post-con">
            <div className="p-2 row">
                <div className='col-2'>
                    <div className='user-post-img-con'>
                        <img src={Avatar} alt="" />
                    </div>
                </div>
                <div className='col-10 user-info'>
                    <p className='post-user-name'>{post.user.firstName} {post.user.lastName}</p>
                    <p className='post-user-location'>{post.location || 'OH, USA'}</p>
                    <p className='post-time'>{moment(post.user.createdAt).toNow(true)}</p>
                </div>
            </div>
            <div className='px-4 py-1'>
                <p className='post-text'>{post.text}</p>
                <div className='d-flex'>
                    <p>{ post.likes.length } Likes - </p>
                    <p className='ml-1'>{ post.comments.length } Comments</p>
                </div>
            </div>
            <CommentContainer post={post} />
        </div>
    )
}