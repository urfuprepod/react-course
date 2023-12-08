import React, {FC} from "react";
import styles from "./PaginatorButton.module.css";
import classNames from "classnames";

type PaginatorButtonProps = {
    active: boolean;
    updatePage: () => void;
    children?: JSX.Element | number;
}


const PaginatorButton: FC<PaginatorButtonProps> = (props: PaginatorButtonProps) => {
    const { active, updatePage, children } = props;

    return (
        <button
            onClick={updatePage}
            className={classNames(styles["paginator__button"], {
                [styles.active]: active,
            })}
        >{children}</button>
    );
};

export default PaginatorButton;
