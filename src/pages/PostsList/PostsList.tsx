import React, { useState, useEffect, useMemo, FC} from "react";
import "./PostsList.css";
import { IPost, IPostFilter, StringFilter, SortingOption, NewPost } from "../../types/post";
import Post from "./components/post/Post";
import Modal from "./components/Modal/Modal";
import axios from "axios";
import Paginator from "../../components/Paginator/Paginator";
import PostSelect from "./components/PostSelect/PostSelect";
const PAGE_SIZE = 10;

const sortingOptions: SortingOption[]  = [
    {
        name: "По заголовку",
        value: "title",
    },
    { name: "По содержимому", value: "body" },
];

type FilterKeys = keyof IPostFilter;

const PostsList: FC = () => {
    function addPost(post: NewPost ) {
        const newPost = {
            ...post,
            userId: 1,
            id: new Date().getMilliseconds(),
        };

        setPosts([...posts, newPost]);
    }

    function updateFilter(name: FilterKeys, value: IPostFilter[FilterKeys]) {
        setFilters({ ...filter, [name]: value });
    }

    const [filter, setFilters] = useState<IPostFilter>({
        searching: "",
        page: 1,
        sorting: "",
    });

    const [open, setOpen] = useState<boolean>(false);

    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        axios
            .get<IPost[]>("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.data)
            .then((data) => setPosts(data))
            .catch((err) => setPosts([]));
    }, []);

    const filteredSortedPosts = useMemo(() => {
        if (!posts.length) return [];

        const { searching, sorting } = filter;

        const result = posts.filter((post) =>
            post.title.toLowerCase().includes(searching.toLowerCase())
        );
        if (sorting) {
            result.sort((post1, post2) =>
                post1[sorting].localeCompare(post2[sorting])
            );
        }

        return result;
    }, [posts, filter]);

    const pagesCount = Math.ceil(filteredSortedPosts.length / PAGE_SIZE);
    const pageIndex = PAGE_SIZE * (filter.page - 1);

    return (
        <div className="container">
            <div className="post-header">
                <input
                    className="post-input"
                    value={filter.searching}
                    onChange={(e) =>
                        setFilters({
                            searching: e.target.value,
                            sorting: filter.sorting,
                            page: 1,
                        })
                    }
                    placeholder="Поиск..."
                />
                <PostSelect
                    options={sortingOptions}
                    activeSorting={filter.sorting}
                    updateSorting={(value: StringFilter) => updateFilter("sorting", value)}
                />
            </div>
            {filteredSortedPosts.length ? (
                <div className="post-list">
                    {filteredSortedPosts
                        .slice(pageIndex, 10 + pageIndex)
                        .map((post) => (
                            <Post key={post.id} data={post} />
                        ))}
                </div>
            ) : (
                <h2>Постов нет</h2>
            )}

            <button className="post-add" onClick={() => setOpen(true)}>
                Добавить
            </button>

            {pagesCount > 1 && (
                <Paginator
                    activePage={filter.page}
                    updatePage={(button: number) => updateFilter("page", button)}
                    pagesCount={pagesCount}
                />
            )}

            <Modal open={open} addPost={addPost} close={() => setOpen(false)} />
        </div>
    );
};

export default PostsList;
