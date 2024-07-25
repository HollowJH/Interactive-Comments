import { useDispatch } from "react-redux"
import { addComment, confirmComment } from "../slices/commentSlice"
import { useRef } from "react"

export function Input({replyId, defaultContent} : {replyId:number | boolean, defaultContent: string}){
    const dispatch = useDispatch()
    const newComment = useRef<HTMLInputElement>(null)

    function handleCreateComment() {
        if (replyId) dispatch(confirmComment([replyId, newComment.current?.value, false]))
        else if (replyId === 0) dispatch(addComment(newComment.current?.value))
        else dispatch(confirmComment([replyId, newComment.current?.value, true]))
    }

    return (<form>
        <input type="text" 
        ref={newComment} 
        defaultValue={defaultContent}
        className="border-black border-solid border-2" />
        <button onClick={e => {
            e.preventDefault()
            handleCreateComment()
        }}>SEND</button>
    </form>)
}