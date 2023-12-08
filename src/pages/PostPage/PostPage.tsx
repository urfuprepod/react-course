import React, { useEffect, useState, FC } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PostPage.css";
import { IPost } from "../../types/post";

const PostPage: FC = () => {
    const { id } = useParams();
    const [post, setPost] = useState<IPost| null>(null);

    useEffect(() => {
        axios
            .get<IPost>(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((res) => res.data)
            .then((data) => setPost(data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!post) return <h3>Загрузка...</h3>;
    return (
        <div className="post">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <span>Автор под номером: {post.userId}</span>
        </div>
    );
};

export default PostPage;
