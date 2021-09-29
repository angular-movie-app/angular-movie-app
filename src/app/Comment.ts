import Timestamp from "./Timestamp"
export default interface Comment {
    message: string
    userId: string
    movieId: number
    added: Date
    updated: Date
}

export interface CommentBuffer {
    message: string
    userId: string
    movieId: number
    added: Timestamp
    updated: Timestamp
}