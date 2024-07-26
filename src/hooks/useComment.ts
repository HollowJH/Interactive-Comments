import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { addComment, confirmComment, deleteComment, editComment, insertReplyTo, updateVotes } from "../slices/commentSlice";
import { CommentStructure } from "../slices/CommentState";

export function useComment(){
    const dispatch = useDispatch()
    const comments = useSelector((state: RootState) => state.comments.comments)

    function createComment(text: string) {
        dispatch(addComment(text))
    }

    const createReply = (comment:CommentStructure) => dispatch(insertReplyTo(comment))

    const modifyComment = (comment:CommentStructure) => dispatch(editComment(comment))

    const vote = (comment:CommentStructure, ammount: number) => dispatch(updateVotes([comment, ammount]))

    const deleteFromList = (comment:CommentStructure) => dispatch(deleteComment(comment))

    const confirmEdit = (replyId:number|boolean, commentContent:string) => dispatch(confirmComment([replyId, commentContent, true]))

    return { comments, createComment, createReply, modifyComment, deleteFromList, confirmEdit, vote }
}