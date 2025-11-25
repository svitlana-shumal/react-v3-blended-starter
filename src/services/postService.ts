import axios from "axios";
import { CreatePost, Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

interface FetchPostsResponse {
  posts: Post[];
  totalCount: number;
}

export const fetchPosts = async (
  searchText: string,
  page: number,
  limit: number
): Promise<FetchPostsResponse> => {
  const response = await axios.get<Post[]>("/posts", {
    params: {
      ...(searchText !== "" && { q: searchText }),
      _limit: limit,
      _page: page,
    },
  });
  return {
    posts: response.data,
    totalCount: Number(response.headers["x-total-count"]),
  };
};

export const createPost = async (newPost: CreatePost) => {
  const response = await axios.post<Post>("/posts", newPost);
  return response.data;
};

export const editPost = async (newDataPost: Post) => {
  const { data } = await axios.patch<Post>(`/posts/${newDataPost.id}}`, newDataPost);
  return data;
};

export const deletePost = async (postId: number) => {
  const response = await axios.delete<Post>(`/posts/${postId}`);
  return response.data;
};
