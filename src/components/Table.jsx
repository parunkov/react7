import { useEffect } from "react";

const Table = ({posts, currentPage, loadPosts}) => {
    useEffect(() => {
        loadPosts();
        console.log(posts);
    }, []);

    return (
        <div>AAA</div>
    )
}

export default Table;
