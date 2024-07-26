import { CommentStructure } from "../slices/CommentState";
import { useState } from "react";
import { ConfirmDelete } from "./confirmDelete";
import { useComment } from "../hooks/useComment";

export function Comment({ commentInfo }: { commentInfo: CommentStructure }) {
    const { vote, createReply, modifyComment } = useComment()
    const [tryDelete, setTryDelete] = useState(false)


    return (<>
        <div className="bg-white p-[16px] min-h-[256px] md:min-h-[167px] md:p-6
    gap-y-8 md:gap-y-0 rounded-lg grid text-left">
            <header className="h-[32px] flex gap-[16px] col-start-1 col-end-3 max-w-[310px]
            md:col-start-2">
                <img src={commentInfo.user.image.webp} className="w-8 h-8" alt="user llogo" />
                <p className="font-bold text-[#334253]">{commentInfo.user.username}</p>
                <p className="text-[#67727E]">{commentInfo.createdAt}</p>
            </header>
            <p className="col-start-1 col-end-3 md:row-start-2 md:row-end-4 md:col-start-2 md:col-end-4 text-[#67727E]">
                {commentInfo.replyingTo && <span className="font-bold text-[#5357B6]" >@{commentInfo.replyingTo} </span>}
                {commentInfo.content}
            </p>
            <div className="grid grid-cols-3 md:grid-cols-1 items-center rounded-[10px] bg-[#F5F6FA] w-[100px] h-[40px]
            md:h-[100px] md:w-[40px] md:mr-[24px] md:col-start-1 md:row-start-1 md:row-end-4 ">
                <button className="flex justify-center items-center h-[40px] md:h-[33px] w-[33px] md:w-[40px] text-[#C5C6EF] hover:text-[#5357B6]" onClick={() => vote(commentInfo, 1)}>
                    <svg className="fill-current" width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 
                        0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 
                        0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" />
                    </svg>
                </button>
                <p className="text-[#5357B6] font-bold text-center">{commentInfo.score}</p>
                <button className="flex justify-center items-center h-[40px] md:h-[33px] w-[33px] md:w-[40px] text-[#C5C6EF] hover:text-[#5357B6]" onClick={() => vote(commentInfo, -1)}>
                    <svg className="fill-current" width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 
                        0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" /></svg>
                </button>
            </div>
            {commentInfo.user.username !== "juliusomo" &&
                <button className="h-[40px] flex items-center text-[#5357B6] hover:text-[#C5C6EF] gap-[8px] justify-self-end
                md:row-start-1 md:col-start-3 "
                    onClick={() => createReply(commentInfo)}>
                    <svg className="fill-current" width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 
                    1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"/></svg>
                    <span className="font-bold">Reply</span>
                </button>}
            {commentInfo.user.username === "juliusomo" &&
                <div className="h-[40px] flex items-center gap-[16px] col-start-2 justify-self-end md:row-start-1 md:col-start-3">
                    <button className="flex items-center gap-[9px] bg-transparent text-[#ED6368] hover:text-[#FFB8BB]" onClick={() => setTryDelete(true)}>
                        <svg className="fill-current" width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 
                        1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" /></svg>
                        <span className=" font-bold">Delete</span>
                    </button>
                    <button className="flex items-center text-[#5357B6] hover:text-[#C5C6EF] gap-[9px] bg-transparent" onClick={() => modifyComment(commentInfo)}>
                        <svg className="fill-current" width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 
                    0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"/></svg>
                        <span className="font-bold">Edit</span>
                    </button>
                </div>}
        </div>
        {tryDelete && <ConfirmDelete commentToDelete={commentInfo} deleteComment={(update: boolean) => setTryDelete(update)} />}
    </>)
}