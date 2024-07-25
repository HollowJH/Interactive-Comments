import { useDispatch } from "react-redux";
import { CommentStructure } from "../slices/CommentState";
import { editComment, insertReplyTo, updateVotes } from "../slices/commentSlice";
import { useState } from "react";
import { ConfirmDelete } from "./confirmDelete";

export function Comment({ commentInfo }: { commentInfo: CommentStructure }) {
    const dispatch = useDispatch()
    const [tryDelete, setTryDelete] = useState(false)


    return (<div className="bg-white text-black w-[450px] h-40 flex gap-8">
        <div>
            <button onClick={() => dispatch(updateVotes([commentInfo, 1]))}>
                +
            </button>
            <p>{commentInfo.score}</p>
            <button onClick={() => dispatch(updateVotes([commentInfo, -1]))}>
                -
            </button>
        </div>
        <p>{commentInfo.id}</p>
        <div className="h-10 w-15">
            <img src="" alt="" />
            <button onClick={() => setTryDelete(true)}>Delete</button>
        </div>
        {commentInfo.user.username === "juliusomo" && <button className="h-10 w-15" onClick={() => dispatch(editComment(commentInfo))}>
            Edit
        </button>}
        <button className="h-10 w-15" onClick={() => dispatch(insertReplyTo(commentInfo))}>
            Reply
        </button>
        {tryDelete && <ConfirmDelete commentToDelete={commentInfo} deleteComment={(update: boolean) => setTryDelete(update)} />}
    </div>)
}