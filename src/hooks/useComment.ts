import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { addComment } from "../slices/commentSlice";

export function useComment(){
    const dispatch = useDispatch()
    const comments = useSelector((state: RootState) => state.comments.comments)

    function createComment(text: string) {
        dispatch(addComment(text))
    }

    return { comments, createComment }
}