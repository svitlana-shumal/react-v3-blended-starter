import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import css from "./App.module.css";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import { useDebounce } from "use-debounce";

export default function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);

  const { data } = useQuery({
    queryKey: ["post", page, debouncedSearchQuery],
    queryFn: () => fetchPosts(debouncedSearchQuery, page),
    placeholderData: keepPreviousData,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={setSearchQuery} />
        {data?.totalPages > 1 && (
          <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={setPage} />
        )}
        <button className={css.button} onClick={openModal}>
          Create post
        </button>
      </header>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* Передати через children компонент CreatePostForm або EditPostForm */}
      </Modal>
      <PostList posts={data?.posts || []} onEdit={openModal} />
    </div>
  );
}
