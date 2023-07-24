import { useEffect } from "react";

const Pagination = ({ currentPage, changePage, loadPosts }) => {
    const totalPages = 10;

    useEffect(() => {
        console.log(currentPage);
    }, [currentPage]);

    const onPlusClick = () => {
        if (currentPage < totalPages) currentPage += 1;
        changePage(currentPage);
        loadPosts(currentPage);
    }

    const onMinusClick = () => {
        if (currentPage > 1) currentPage -= 1;
        changePage(currentPage);
        loadPosts(currentPage);
    }

    return (
        <div className="pagination">
            <div className="pagination__block" onClick={onMinusClick}>Назад</div>
            <div className="pagination__block"></div>
            <div className="pagination__block" onClick={onPlusClick}>Далее</div>
        </div>
    )
}

export default Pagination;
