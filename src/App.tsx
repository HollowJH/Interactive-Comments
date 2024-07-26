import './App.css'
import { Comment } from './Components/Comment'
import { Input } from './Components/Input'
import { useComment } from './hooks/useComment'

function App() {
  const { comments } = useComment()

  return (
    <main className='flex flex-col gap-4 w-[343px] md:w-[730px] my-[32px] md:my-[64px] '>
      {comments.map((comment) => {
        if (comment.id < 0) return <Input replyId={comment.id} defaultContent={"@" + comment.replyingTo + (comment.content !== "" ? " " + comment.content : "")} />
        return (<>
          <Comment key={comment.id} commentInfo={comment} />
          {comment.replies && comment.replies.length !== 0 && 
          <div className="w-[343px] md:w-[730px] md:pl-[55px] min-h-[256px] border-l-[#E9EBF0] border-l-2 border-solid
    gap-4 flex flex-col pl-4 self-end">
            {comment.replies.map(reply => {
              if (reply.id < 0) return <Input replyId={reply.id} key={reply.id} defaultContent={"@" + reply.replyingTo + ( reply.content !== "" ? " " + reply.content : "")} />
              return <Comment key={reply.id} commentInfo={reply} />
            })}
          </div>}
        </>)
      })}
      <Input replyId={0} defaultContent=''/>
    </main>
  )
}

export default App
