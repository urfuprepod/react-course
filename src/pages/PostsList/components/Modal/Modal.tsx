import React, { useState, useEffect, FC } from "react";
import styles from "./Modal.module.css";
import classNames from "classnames";
import { NewPost } from "../../../../types/post";

type ModalProps = {
    open: boolean;
    addPost: (post: NewPost) => void;
    close: () => void;
}

type NewPostKeys = keyof NewPost;

const Modal: FC<ModalProps> = (props) => {
    const { open, addPost, close } = props;

    function updatePost(name: NewPostKeys, value: NewPost[NewPostKeys]) {
        setNewPost({ ...newPost, [name]: value });
    }

    function setPost() {
        if (newPost.title) {
            addPost(newPost);
            close();
        }
    }

    const [newPost, setNewPost] = useState<NewPost>({
        title: "",
        body: "",
    });

    useEffect(() => {
        if (!open) {
            setNewPost({ title: "", body: "" });
        }
    }, [open]);

    return (
        <div
            onClick={close}
            className={classNames(styles["modal-container"], {
                [styles.open]: open,
            })}
        >
            <div
                className={styles["modal"]}
                onClick={(e) => e.stopPropagation()}
            >
                <h6 className={styles["modal__title"]}>Добавить пост</h6>
                <input
                    value={newPost.title}
                    onChange={(e) => updatePost("title", e.target.value)}
                    className={styles["modal__input"]}
                    placeholder="Название поста"
                />
                <textarea
                    value={newPost.body}
                    onChange={(e) => updatePost("body", e.target.value)}
                    className={styles["modal__textarea"]}
                    placeholder="Описание поста"
                />
                <button onClick={setPost} className={styles["modal__add"]}>
                    Добавить
                </button>
            </div>
        </div>
    );
};

export default Modal;
