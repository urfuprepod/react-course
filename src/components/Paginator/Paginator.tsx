import React, { useMemo, FC } from "react";
import styles from "./Paginator.module.css";
import PaginatorButton from "./PaginatorButton/PaginatorButton";


type PaginatorProps = {
    activePage: number;
    updatePage: (page: number) => void;
    pagesCount: number;
}

const Paginator: FC<PaginatorProps> = (props: PaginatorProps) => {
    const { activePage, updatePage, pagesCount } = props;

    const pagesArray = useMemo<number[]>(
        () => Array.from({ length: pagesCount }, (_, i) => i + 1),
        [pagesCount]
    );

    return (
        <div className={styles.paginator}>
            {pagesArray.map((button) => (
                <PaginatorButton
                    key={button}
                    active={activePage === button}
                    updatePage={() => updatePage(button)}
                >
                    {button}
                </PaginatorButton>
            ))}
        </div>
    );
};

export default Paginator;
