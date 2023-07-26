import { useEffect, useState } from 'react';
import styles from './Table.module.scss';
import cn from 'classnames';
console.log(styles);

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
        console.log(reverseSort ? cn(styles.sort, styles.reverse) : styles.sort);
        return (
            <th className={styles.title} data-name={id} onClick={onClick}>
                {text}
                {column === id ? <span className={reverseSort ? cn(styles.sort, styles.reverse) : styles.sort}>
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
                <td>{id}</td>
                <td>{title}</td>
                <td>{body}</td>
            </tr>
        )
    }

    return (
        <div>
            <input type="text" className="input" onInput={onFilterInput} value={filterValue.value} />
            <table>
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
