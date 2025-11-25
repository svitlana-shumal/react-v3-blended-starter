import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "../../types/post";
import css from "./PostList.module.css";
import { deletePost } from "../../services/postService";

interface PostListProps {
  posts: Post[];
  toggleModal: () => void;
  toggleEditPost: (post: Post) => void;
}

export default function PostList({ posts, toggleModal, toggleEditPost }: PostListProps) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Post delete successfully!");
    },
    onError: (error) => {
      console.error("Delete post error:", error);
    },
  });
  const handleDeletePost = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {posts.map((post) => (
        <li key={post.id} className={css.listItem}>
          <h2 className={css.title}>{post.title}</h2>
          <p className={css.content}>{post.body}</p>
          <div className={css.footer}>
            <button
              onClick={() => {
                toggleModal();
                toggleEditPost(post);
              }}
              className={css.edit}
            >
              Edit
            </button>
            <button className={css.delete} onClick={() => handleDeletePost(post.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
