import { createSlice } from "@reduxjs/toolkit";
import { CommentStructure, Structure } from "./CommentState";

const initialState: Structure = {
    "currentUser": {
        "image": {
            "png": "/avatars/image-juliusomo.png",
            "webp": "/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo"
    },
    "comments": [
        {
            "id": 1,
            "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
            "createdAt": "1 month ago",
            "score": 12,
            "user": {
                "image": {
                    "png": "/avatars/image-amyrobson.png",
                    "webp": "/avatars/image-amyrobson.webp"
                },
                "username": "amyrobson"
            },
            "replies": []
        },
        {
            "id": 2,
            "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
            "createdAt": "2 weeks ago",
            "score": 5,
            "user": {
                "image": {
                    "png": "/avatars/image-maxblagun.png",
                    "webp": "/avatars/image-maxblagun.webp"
                },
                "username": "maxblagun"
            },
            "replies": [
                {
                    "id": 3,
                    "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                    "createdAt": "1 week ago",
                    "score": 4,
                    "replyingTo": "maxblagun",
                    "user": {
                        "image": {
                            "png": "/avatars/image-ramsesmiron.png",
                            "webp": "/avatars/image-ramsesmiron.webp"
                        },
                        "username": "ramsesmiron"
                    }
                },
                {
                    "id": 4,
                    "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                    "createdAt": "2 days ago",
                    "score": 2,
                    "replyingTo": "ramsesmiron",
                    "user": {
                        "image": {
                            "png": "/avatars/image-juliusomo.png",
                            "webp": "/avatars/image-juliusomo.webp"
                        },
                        "username": "juliusomo"
                    }
                }
            ]
        }
    ]
}

function getLastId(comments: CommentStructure[]) {
    let lastId = comments.length

    for (let index = 0; index < comments.length; index++) {
        const ammountOfReplies = comments[index].replies?.length
        if (ammountOfReplies && ammountOfReplies !== 0) lastId += ammountOfReplies
    }

    return lastId + 1
}

export const commentSlice = createSlice({
    name: "Structure",
    initialState,
    reducers: {
        addComment: (state, newCommentContent) => {
            const newComment = {
                "id": getLastId(state.comments),
                "content": newCommentContent.payload,
                "createdAt": "Today",
                "score": 0,
                "user": {
                    "image": {
                        "png": "/avatars/image-juliusomo.png",
                        "webp": "/avatars/image-juliusomo.webp"
                    },
                    "username": "juliusomo"
                },
                replies: []
            }
            state.comments.push(newComment)
        },
        deleteComment: (state, commentToDelete) => {
            const index = state.comments.findIndex(elem => elem.id === commentToDelete.payload.id)

            if (index !== -1) {
                state.comments.splice(index, 1)
            } else {
                for (let i = 0; i < state.comments.length; i++) {
                    if (state.comments[i].replies?.length === 0 || state.comments[i + 1]?.id < commentToDelete.payload.id) continue
                    const replyIndex = state.comments[i].replies.findIndex((elem: CommentStructure) => elem.id === commentToDelete.payload.id)
                    state.comments[i].replies?.splice(replyIndex, 1)
                }
            }
        },
        editComment: (state, commentToEdit) => {
            const index = state.comments.findIndex(elem => elem.id === commentToEdit.payload.id)

            if (index !== -1) {
                state.comments[index].id = state.comments[index].id * -1
            } else {
                for (let i = 0; i < state.comments.length; i++) {
                    if (state.comments[i].replies?.length === 0 || state.comments[i + 1]?.id < commentToEdit.payload.id) continue
                    const replyToIndex = state.comments[i].replies?.findIndex((elem: CommentStructure) => elem.id === commentToEdit.payload.id)
                state.comments[i].replies[replyToIndex].id = state.comments[i].replies[replyToIndex].id * -1
                }
            }
        },
        updateVotes: (state, payload) => {
            const index = state.comments.findIndex(elem => elem.id === payload.payload[0].id)
            if (index !== -1) state.comments[index].score += payload.payload[1]
            else {
                for (let i = 0; i < state.comments.length; i++) {
                    if (state.comments[i].replies?.length === 0 || state.comments[i + 1]?.id < payload.payload[0].id) continue
                    const replyToIndex = state.comments[i].replies?.findIndex((elem: CommentStructure) => elem.id === payload.payload[0].id)
                    state.comments[i].replies[replyToIndex].score += payload.payload[1]
                }
            }
        },
        insertReplyTo: (state, commentReplied) => {
            const index = state.comments.findIndex(elem => elem.id === commentReplied.payload.id)

            const commentScaffold = {
                "id": getLastId(state.comments) * -1,
                "content": "",
                "createdAt": "Today",
                "score": 0,
                "replyingTo": commentReplied.payload.user.username,
                "user": {
                    "image": {
                        "png": "/avatars/image-juliusomo.png",
                        "webp": "/avatars/image-juliusomo.webp"
                    },
                    "username": "juliusomo"
                }
            }

            if (index !== -1) {
                state.comments[index].replies.push(commentScaffold)
            } else {
                for (let i = 0; i < state.comments.length; i++) {
                    if (state.comments[i].replies?.length === 0 || state.comments[i + 1]?.id < commentReplied.payload.id) continue
                    const replyToIndex = state.comments[i].replies?.findIndex((elem: CommentStructure) => elem.id === commentReplied.payload.id)
                    state.comments[i].replies?.splice(replyToIndex + 1, 0, commentScaffold)
                }
            }
        },
        confirmComment: (state, edittedComment) => {
            const index = state.comments.findIndex(elem => elem.id === edittedComment.payload[0])
            const content = edittedComment.payload[1]

            if (!edittedComment.payload[2]) {  
                edittedComment.payload[1] = content.slice(content.indexOf(" ") + 1)
            }

            if (index !== -1) {
                state.comments[index].id = Math.abs(edittedComment.payload[0])
                state.comments[index].content = edittedComment.payload[1]
            } else {
                for (let i = 0; i < state.comments.length; i++) {
                    if (state.comments[i].replies?.length === 0 || state.comments[i + 1]?.id < edittedComment.payload[0]) continue
                    const replyToIndex = state.comments[i].replies?.findIndex((elem: CommentStructure) => elem.id === edittedComment.payload[0])
                    state.comments[i].replies[replyToIndex].content = edittedComment.payload[1]
                    state.comments[i].replies[replyToIndex].id = Math.abs(edittedComment.payload[0])
                }
            }
        }
    }
})

export const { addComment, deleteComment, editComment, updateVotes, insertReplyTo, confirmComment } = commentSlice.actions

export default commentSlice.reducer