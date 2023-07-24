import { useEffect, useState } from "react";
import './Pagination.scss';

const Pagination = ({ currentPage, changePage, loadPosts }) => {
    console.log(currentPage);
    const totalPages = 10;
    const [pages, setPages] = useState([]);

    const setPagesValues = (currentPage) => {
        const newPages = [];
        let startPage = 1;
        if (currentPage > 3) {
            startPage = currentPage - 2;
        }
        if (currentPage > totalPages - 2) {
            startPage = totalPages - 4;
        }
        for (let i = 0; i < 5; i++) {
            newPages.push(startPage + i);
        }
        setPages(newPages);
    }

    useEffect(() => {
        setPagesValues(currentPage)
    }, []);

    const onPlusClick = () => {
        if (currentPage < totalPages) {
            currentPage += 1;
            setPagesValues(currentPage);
        }
        changePage(currentPage);
        loadPosts(currentPage);
    }

    const onMinusClick = () => {
        if (currentPage > 1) currentPage -= 1;
        changePage(currentPage);
        loadPosts(currentPage);
        setPagesValues(currentPage);
    }
    
    const onPageClick = (event) => {
        changePage(event.target.dataset.page);
        setPagesValues(event.target.dataset.page);
        loadPosts(event.target.dataset.page);
    }

    return (
        <div className="pagination">
            <div className="pagination__block" onClick={onMinusClick}>Назад</div>
            <div className="pagination__block">
                {pages.map((page) => (
                    <div 
                        className={`pagination__page ${page === currentPage ? 'pagination__page_active' : ''}`} 
                        key={page}
                        data-page={page}
                        onClick={onPageClick}
                    >{page}</div>
                ))}
            </div>
            <div className="pagination__block" onClick={onPlusClick}>Далее</div>
        </div>
    )
}

export default Pagination;
