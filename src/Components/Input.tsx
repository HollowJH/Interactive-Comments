import { useDispatch } from "react-redux"
import { addComment, confirmComment } from "../slices/commentSlice"
import { useRef } from "react"
import { useComment } from "../hooks/useComment"

export function Input({replyId, defaultContent} : {replyId:number | boolean, defaultContent: string}){
    const dispatch = useDispatch()
    const {confirmEdit} = useComment()
    const newComment = useRef<HTMLInputElement>(null)

    function handleCreateComment() {
        if (replyId) dispatch(confirmComment([replyId, newComment.current?.value, false]))
        else if (replyId === 0) dispatch(addComment(newComment.current?.value))
        else confirmEdit(replyId, newComment.current?.value ?? "")
    }

    return (<form className="bg-white p-4 w-full min-h-[189px] md:min-h-[144px] 
    rounded-lg grid gap-8 items-center text-left md:gap-0 md:p-6">
        <input type="text" 
        ref={newComment} 
        defaultValue={defaultContent}
        className="min-h-[96px] md:w-full border-[#E9EBF0] border-solid border-2 focus:border-[#5357B6] focus:outline-none
        rounded-lg px-6 py-3 col-start-1 col-end-4 md:col-start-2 md:col-end-3 caret-[#5357B6]  " />
        <img className="w-8 h-8 md:col-start-1 md:row-start-1 md:self-start" src="/avatars/image-juliusomo.webp" alt="" />
        <button 
        className="w-[104px] h-[48px] bg-[#5357B6] rounded-lg text-white font-bold col-start-3 justify-self-end md:self-start"
        onClick={e => {
            e.preventDefault()
            handleCreateComment()
        }}>{replyId === 0 ? "SEND" : "REPLY"}</button>
    </form>)
}