import axios from "axios";
import { Post } from "../types/post";

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

// export async function createPost(newPost: {
//   title: string;
//   content: string;
//   tag: string;
// }): Promise<Post> {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//     },
//   };

//   const response = await axios.post<Post>(BASE_URL, newPost, config);
//   return response.data;
// }

export const editPost = async (newDataPost: Post) => {
  const { data } = await axios.patch<Post>(`/posts/${newDataPost.id}}`, newDataPost);
  return data;
};

// export async function editPost(newDataPost: {
//   title: string;
//   content: string;
//   tag: string;
// }): Promise<Post> {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//     },
//   };

//   const response = await axios.patch(BASE_URL, newDataPost, config);
//   return response.data;
// }

// export async function deletePost(postId: string): Promise<Post> {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//     },
//   };

//   const response: AxiosResponse<Post> = await axios.delete(`${BASE_URL}/${postId}`, config);
//   return response.data;
// }
