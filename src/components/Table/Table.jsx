import { useEffect, useState } from 'react';
import styles from './Table.module.scss';
import cn from 'classnames';

const Table = ({ posts, currentPage, loadPosts }) => {
    const [filteredPocts, setFilteredPosts] = useState(posts);
    const [filterValue, setFilterValue] = useState({
        value: '',
        column: null,
        numberSort: true,
        reverseSort: false
    });
    const [savedPage, setSavedPage] = useState(currentPage);

    useEffect(() => {
        if (posts.length === 0) loadPosts(currentPage);
        if (filterValue.value.length === 0 && !filterValue.column) setFilteredPosts(posts);
        if (currentPage !== savedPage) {
            setSavedPage(currentPage);
            setFilterValue({
                value: '',
                column: null,
                numberSort: true,
                reverseSort: false
            });
            loadPosts(currentPage);
        }
    }, [currentPage, filterValue, filteredPocts, loadPosts, posts, savedPage]);

    const filterSortPosts = (posts, { value, column, numberSort, reverseSort }) => {
        let newPosts = [];
        const newFilterdPosts = posts.filter((item) => item.id.toString().includes(value)
            || item.title.toLowerCase().includes(value.toLowerCase())
            || item.body.toLowerCase().includes(value.toLowerCase()));
        if (!column) {
            newPosts = newFilterdPosts;
        } else {
            if (numberSort) {
                newPosts = newFilterdPosts.sort((a, b) => a[column] - b[column]);
            } else {
                newPosts = newFilterdPosts.sort((a, b) => a[column].localeCompare(b[column]));
            }
        }
        if (reverseSort) return newPosts.reverse();
        return newPosts;
    };

    const onFilterInput = (event) => {
        const newFilterValue = { ...filterValue, value: event.target.value };
        setFilterValue(newFilterValue);
        setFilteredPosts(filterSortPosts(posts, newFilterValue));
    }

    const onColumnClick = (event) => {
        if (event.target.dataset.name === filterValue.column) {
            const newFilterValue = { ...filterValue, reverseSort: !filterValue.reverseSort };
            setFilterValue(newFilterValue);
            setFilteredPosts(filterSortPosts(posts, newFilterValue));
        } else {
            const newFilterValue = { ...filterValue, column: event.target.dataset.name, numberSort: event.target.dataset.name === 'id', reverseSort: false };
            setFilterValue(newFilterValue);
            setFilteredPosts(filterSortPosts(posts, newFilterValue));
        }
    }

    const TableTitle = ({ id, column, reverseSort, onClick, text }) => {
        return (
            <th className={cn(styles.tableTitle, styles[id])} data-name={id} onClick={onClick}>
                {text}
                {column === id ? <span 
                    className={reverseSort ? cn(styles.sort, styles.reverse) : styles.sort} 
                >
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.353553" y1="0.646447" x2="6.18011" y2="6.47301" stroke="#FCFCFC" />
                        <line x1="5.64645" y1="6.30331" x2="11.3033" y2="0.646453" stroke="white" />
                    </svg>
                </span> : ''}
            </th>
        )
    };

    const TableRow = ({ id, title, body }) => {
        return (
            <tr>
                <td className={cn(styles.td, styles['id'])}>{id}</td>
                <td className={cn(styles.td, styles['title'])}>{title}</td>
                <td className={cn(styles.td, styles['body'])}>{body}</td>
            </tr>
        )
    }

    return (
        <div className={styles.tableWrapper}>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    className={styles.input}
                    onInput={onFilterInput}
                    value={filterValue.value}
                    placeholder='Поиск'
                />
                <div className={styles.lens}>
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_16_77)">
                            <path d="M20.7353 19.4958L14.7101 13.4663C15.8979 12.0418 16.6124 10.2213 16.6124 8.23301C16.6124 
                            3.69689 12.8896 0.00860596 8.31048 0.00860596C3.73132 0.00860596 0 3.70119 0 8.23731C0 12.7734 
                            3.72272 16.4617 8.30187 16.4617C10.2472 16.4617 12.0375 15.7946 13.4577 14.68L19.5045 20.7267C19.8574 
                            21.0796 20.3824 21.0796 20.7353 20.7267C21.0882 20.3738 21.0882 19.8487 20.7353 19.4958ZM1.76452 
                            8.23731C1.76452 4.67383 4.69966 1.77743 8.30187 1.77743C11.9041 1.77743 14.8392 4.67383 14.8392 
                            8.23731C14.8392 11.8008 11.9041 14.6972 8.30187 14.6972C4.69966 14.6972 1.76452 11.7965 1.76452 
                            8.23731Z" fill="white" />
                            </g>
                        <defs>
                            <clipPath id="clip0_16_77">
                                <rect width="21" height="21" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <TableTitle
                            id={'id'}
                            column={filterValue.column}
                            reverseSort={filterValue.reverseSort}
                            onClick={onColumnClick}
                            text={'ID'}
                        />
                        <TableTitle
                            id={'title'}
                            column={filterValue.column}
                            reverseSort={filterValue.reverseSort}
                            onClick={onColumnClick}
                            text={'Заголовок'}
                        />
                        <TableTitle
                            id={'body'}
                            column={filterValue.column}
                            reverseSort={filterValue.reverseSort}
                            onClick={onColumnClick}
                            text={'Описание'}
                        />
                    </tr>
                    {filteredPocts.map((post) => <TableRow key={post.id} id={post.id} title={post.title} body={post.body} />)}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
