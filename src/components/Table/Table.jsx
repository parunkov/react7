import { useEffect, useState } from 'react';

const Table = ({ posts, currentPage, loadPosts }) => {
    const [filteredPocts, setFilteredPosts] = useState(posts);
    const [filterValue, setFilterValue] = useState({
        value: '',
        column: null,
        numberSort: true,
        reverseSort: false
    });

    useEffect(() => {
        if (posts.length === 0) loadPosts(currentPage);
        if (filterValue.value.length === 0 && !filterValue.column) setFilteredPosts(posts);
    }, [currentPage, filterValue, filteredPocts, loadPosts, posts]);

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
        const newFilterValue = {...filterValue, value: event.target.value};
        setFilterValue(newFilterValue);
        setFilteredPosts(filterSortPosts(posts, newFilterValue));
    }

    const onColumnClick = (event) => {
        if (event.target.dataset.name === filterValue.column) {
            const newFilterValue = {...filterValue, reverseSort: !filterValue.reverseSort};
            setFilterValue(newFilterValue);
            setFilteredPosts(filterSortPosts(posts, newFilterValue));
        } else {
            const newFilterValue = {...filterValue, column: event.target.dataset.name, numberSort: event.target.dataset.name === 'id', reverseSort: false};
            setFilterValue(newFilterValue);
            setFilteredPosts(filterSortPosts(posts, newFilterValue));
        }
    }

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
                        <th data-name="id" onClick={onColumnClick}>ID</th>
                        <th data-name="title" onClick={onColumnClick}>Заголовок</th>
                        <th data-name="body" onClick={onColumnClick}>Описание</th>
                    </tr>
                    {filteredPocts.map((post) => <TableRow key={post.id} id={post.id} title={post.title} body={post.body} />)}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
