import React from 'react';
import cn from "classnames"
import { useDispatch, useSelector } from "react-redux"

import s from './styles.module.css';
import { toggleLikeAC } from '../../../../../redux/sagas/booksSaga';
import { getIsLoadingBooks } from '../../../../../redux/selectors/booksSelectors';


const CommentCard = React.memo(({comment, username, date, isLiked, isDisliked, likeCount, dislikeCount, id, isAuth}) => {
    const loading = useSelector(getIsLoadingBooks)
    const isLoading = loading.includes("like") || !isAuth
    const dispatch = useDispatch()
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.upperContainer}>
                    <div className={s.upper}>
                        <div className={s.author}>
                            {username}
                        </div>
                        <div className={s.date}>
                            <span className={s.at}>at</span> {date}
                        </div>
                        <div className={isLoading ? cn(s.likesBlock, s.disabled) : s.likesBlock}>
                            <div
                                className={isLiked ? cn(s.like, s.liked) : s.like}
                                onClick={() => dispatch(toggleLikeAC(id, "like"))}>
                                + {likeCount}
                            </div>
                            <div
                                className={isDisliked ? cn(s.like, s.right, s.liked) : cn(cn(s.like, s.right))}
                                onClick={() => dispatch(toggleLikeAC(id, "dislike"))}>
                                - {dislikeCount}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.lower}>
                    {comment}
                </div>
            </div>
        </div>
    )
})

export default CommentCard;
