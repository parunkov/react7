import { useEffect, useState } from 'react';

const Table = ({posts, currentPage, loadPosts}) => {
    const [filteredPocts, setFilteredPosts] = useState(posts);
    const [column, setColumn] = useState(null);
    const [numberSort, setNumberSort] = useState(false);
    const [reverseSort, setReverseSort] = useState(false);

    useEffect(() => {
        if (posts.length === 0) loadPosts(currentPage);
        setFilteredPosts(posts);
    }, [currentPage, loadPosts, posts]);

    const TableRow = ({id, title, body}) => {
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
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Заголовок</th>
                        <th>Описание</th>
                    </tr>
                    {filteredPocts.map((post) => <TableRow key={post.id} id={post.id} title={post.title} body={post.body} />)}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
