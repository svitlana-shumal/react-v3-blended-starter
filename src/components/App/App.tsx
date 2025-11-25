import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import { useDebouncedCallback } from "use-debounce";
import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import css from "./App.module.css";
import { Post } from "../../types/post";
import EditPostForm from "../EditPostForm/EditPostForm";

const LIMIT = 8;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);
  const [editedPost, setEditedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data } = useQuery({
    queryKey: ["posts", searchQuery, currentPage],
    queryFn: () => fetchPosts(searchQuery, currentPage, LIMIT),
    placeholderData: keepPreviousData,
  });
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (post: Post) => {
    setEditedPost(post);
    setIsEditPost(true);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setEditedPost(null);
    setIsEditPost(false);
    setIsModalOpen(false);
    setIsCreatePost(false);
  };

  const handleChange = useDebouncedCallback((val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  }, 300);

  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / LIMIT) : 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={handleChange} />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        <button
          className={css.button}
          onClick={() => {
            setIsCreatePost(true);
            setIsEditPost(false);
            setIsModalOpen(true);
          }}
        >
          Create post
        </button>
      </header>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          {isCreatePost && <CreatePostForm onCancel={handleCloseModal} />}
          {isEditPost && editedPost && (
            <EditPostForm initialValues={editedPost} onClose={handleCloseModal} />
          )}
        </Modal>
      )}
      {data && data?.posts.length > 0 && (
        <PostList posts={data.posts} toggleModal={handleCloseModal} toggleEditPost={handleEdit} />
      )}
    </div>
  );
}
