import './App.css'
import { Comment } from './Components/Comment'
import { Input } from './Components/Input'
import { useComment } from './hooks/useComment'

function App() {
  const { comments } = useComment()

  return (
    <>
      {comments.map((comment) => {
        if (comment.id < 0) return <Input replyId={false} defaultContent={"@" + comment.replyingTo + (comment.content !== "" ? " " + comment.content : "")} />
        return (<>
          <Comment key={comment.id} commentInfo={comment} />
          {comment.replies && comment.replies.length !== 0 && <div>
            {comment.replies.map(reply => {
              if (reply.id < 0) return <Input replyId={reply.id} defaultContent={"@" + reply.replyingTo + ( reply.content !== "" ? " " + reply.content : "")} />
              return <Comment key={reply.id} commentInfo={reply} />
            })}
          </div>}
        </>)
      })}
      <Input replyId={0} defaultContent=''/>
    </>
  )
}

export default App
