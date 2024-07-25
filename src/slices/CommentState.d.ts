export interface CurrentUser {
    image: {
        png: string
        webp: string
    }
    username: string
}

export interface CommentStructure {
    id: number
    content: string
    createdAt: string
    score: number
    user: CurrentUser
    replies?: Reply[]
    replyingTo?: string
}

export interface Structure {
    currentUser: CurrentUser
    comments: CommentStructure[]
}