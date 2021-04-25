import React, { useEffect, useState } from 'react';
import cn from "classnames"
import CommentCard from "./CommentCard"

import s from './styles.module.css';
import { addCommentAC } from '../../../../redux/sagas/booksSaga';


const Comments = ({theme, isLoading, isAuth, dispatch, bookId, comments}) => {
	const [comment, setComment] = useState("")
	useEffect(() => {
		setComment("")
	}, [comments.length])
	const onSubmit = () => {
		if (comment.length !== 0) {
			dispatch(addCommentAC(bookId, comment))
		}
	}
	const onEnterClick = (e) => {
        if (e.key === "Enter") {
        	e.preventDefault()
            onSubmit()
        }
    }
  	return (
		<div className={s.commentsBlock}>
			<div className={s.commentsTitle}>
				Comments
			</div>
			{comments.map(comment => {
				return <CommentCard
						key={comment.id}
						{...comment}
						isAuth={isAuth}
					/>
			})}
			<div className={s.inputBlock}>
				<textarea placeholder="Type your review"
					className={s.commentInput}
					value={comment}
					onChange={(e) => setComment(e.currentTarget.value)}
					onKeyPress={onEnterClick}
				/>
				<div
					className={isLoading ? cn(s.button, s.disabled) : s.button}
					onClick={onSubmit}>
					Send comment
				</div>
			</div>
		</div>
  	)
}

export default Comments;
