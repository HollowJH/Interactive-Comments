import { useComment } from "../hooks/useComment"
import { CommentStructure } from "../slices/CommentState"

export function ConfirmDelete({deleteComment: confirmDeleteComment, commentToDelete} : {deleteComment : (value:boolean) => void, commentToDelete: CommentStructure}) {
    const {deleteFromList} = useComment()

    function handleDelete(decision: boolean) {
        confirmDeleteComment(decision)
        if (decision) deleteFromList(commentToDelete)
    }

    return (<div className="fixed flex justify-center items-center w-[100vw] h-[100vh] top-0 left-0 bg-black/50 text-left">
        <div className="w-[343px] h-[224px] bg-white rounded-lg px-[27px] py-6 grid gap-4">
        <p className="text-[#334253]"><strong>Delete comment</strong></p>
        <p className="text-[#67727E]">Are you sure you want to delete this comment? This will remove the comment and can’t be undone.</p>
        <div className="flex text-nowrap gap-3 ">
            <button className="items-center rounded-[10px] bg-[#67727E] w-[138px] h-[48px] font-bold text-white"
            onClick={() => handleDelete(false)}>NO, CANCEL</button>
            <button className="items-center rounded-[10px] bg-[#ED6368] w-[138px] h-[48px] font-bold text-white"
            onClick={() => handleDelete(true)}>YES, DELETE</button>
        </div>
    </div>
    </div>)
}