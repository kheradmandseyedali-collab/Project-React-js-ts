export type PostsResponse = {
    posts: Post[];
    total: number,
    skip: number,
    limit: number
}

export type Post = {
    id: number,
    title: string
    body: string
    tags: string[],
    reactions: Reactions,
    views: number,
    userId: number
}

type Reactions = {
    likes: number
    dislikes: number
}

export type CreatePostForm = {
    title: string;
    body: string;
    userId: number | undefined
}