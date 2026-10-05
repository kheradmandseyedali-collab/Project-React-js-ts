import { DUMMY_BASE_URL } from "../constants";

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions?: {
    likes: number;
    dislikes: number;
  };
  views: number;
};

export type PostsResponse = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
};

export type CreatePostForm = {
  title: string;
  body: string;
  userId?: number;
};


export const getPostsApi = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<PostsResponse> => {
  const response = await fetch(
    `${DUMMY_BASE_URL}/posts?limit=${pageSize}&skip=${page * pageSize}`
  );

  if (!response.ok) {
    throw new Error("Get posts failed");
  }
  const data: PostsResponse = await response.json();
  return data;
};

export const getPostByIdApi = async (id: string | number): Promise<Post> => {
  const res = await fetch(`${DUMMY_BASE_URL}/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
};

export const updatePostApi = async ({
  id,
  title,
  body,
}: {
  id: string | number;
  title: string;
  body: string;
}): Promise<Post> => {
  const res = await fetch(`${DUMMY_BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body }),
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
};

export const deletePostApi = async (id: string | number) => {
  const res = await fetch(`${DUMMY_BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
};



export const createPostApi = async (post: CreatePostForm): Promise<Post> => {
  const res = await fetch(`${DUMMY_BASE_URL}/posts/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create post");
  }

  return res.json();
};