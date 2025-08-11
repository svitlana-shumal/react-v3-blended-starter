import axios, { AxiosResponse } from "axios";
import { Post } from "../types/post";

export interface FetchPostsResponse {
  posts: Post[];
  totalPages: number;
}

// axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
const BASE_URL = "https://jsonplaceholder.typicode.com";
const TOKEN = import.meta.env.VITE_API_KEY;

export async function fetchPosts(
  search: string,
  page: number,
  perPage: number = 12
): Promise<FetchPostsResponse> {
  const params: Record<string, unknown> = {
    page: String(page),
    perPage: String(perPage),
  };
  if (search.trim()) {
    params.search = search;
  }
  const config = {
    params,
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  const response = await axios.get<FetchPostsResponse>(BASE_URL, config);
  return response.data;
}

export async function createPost(newPost: {
  title: string;
  content: string;
  tag: string;
}): Promise<Post> {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const response = await axios.post<Post>(BASE_URL, newPost, config);
  return response.data;
}

export async function editPost(newDataPost: {
  title: string;
  content: string;
  tag: string;
}): Promise<Post> {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const response = await axios.patch(BASE_URL, newDataPost, config);
  return response.data;
}

export async function deletePost(postId: string): Promise<Post> {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const response: AxiosResponse<Post> = await axios.delete(`${BASE_URL}/${postId}`, config);
  return response.data;
}
