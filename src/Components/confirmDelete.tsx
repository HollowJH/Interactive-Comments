import { useDispatch } from "react-redux"
import { deleteComment } from "../slices/commentSlice"
import { CommentStructure } from "../slices/CommentState"

export function ConfirmDelete({deleteComment: confirmDeleteComment, commentToDelete} : {deleteComment : (value:boolean) => void, commentToDelete: CommentStructure}) {
    const dispatch = useDispatch()

    function handleDelete(decision: boolean) {
        confirmDeleteComment(decision)
        if (decision) dispatch(deleteComment(commentToDelete))
    }

    return (<div className="fixed w-[100vw] h-[100vh] ">
        <p><strong>Delete comment</strong></p>
        <p>Are you sure you want to delete this comment? This will remove the comment and can’t be undone.</p>
        <div className="flex">
            <button onClick={() => handleDelete(false)}>NO, CANCEL</button>
            <button onClick={() => handleDelete(true)}>YES, DELETE</button>
        </div>
    </div>)
}