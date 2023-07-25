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
        console.log(value);
        const newPosts = posts.filter((item) => item.id.toString().includes(value)
        || item.title.toLowerCase().includes(value.toLowerCase())
        || item.body.toLowerCase().includes(value.toLowerCase()))
        console.log(newPosts);
        return newPosts;
    };

    const onFilterInput = (event) => {
        const newFilterValue = {...filterValue, value: event.target.value};
        setFilterValue(newFilterValue);
        setFilteredPosts(filterSortPosts(posts, newFilterValue));
    }

    const onColumnClick = (event) => {
        console.log(event.target.dataset.name);
        if (event.target.dataset.name === filterValue.column) {
            console.log(3333);
            // setColumn(event.target.dataset.name);
        } else {
            console.log(2222);
            // setColumn(event.target.dataset.name);
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
