import React, {FC} from "react";
import { IPost } from "../../../../types/post";
import styles from "./Post.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addDeleteAction, RootState } from "../../../../store";

type PostProps = {
    data: IPost;
}

const Post: FC<PostProps> = ({data}: PostProps) => {
    const navigate = useNavigate();
    const counter = useSelector((state: RootState) => state.deleteCount);
    const dispatch = useDispatch();

    function goPage() {
        navigate(`/post/${data.id}`);
    }

    return (
        <div className={styles.post}>
            <Link to={`/post/${data.id}`} className={styles["post-title"]}>
                {data.title}
            </Link>
            {counter}
            <p>{data.body}</p>
            <div className={styles["post-buttons"]}>
                <button onClick={goPage} className={styles["post-open"]}>
                    Перейти
                </button>
                <button
                    onClick={() => dispatch(addDeleteAction(counter + 1))}
                    className={styles["post-delete"]}
                >
                    Удалить
                </button>
            </div>
        </div>
    );
};

export default Post;
