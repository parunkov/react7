import { useEffect } from "react";

const Table = ({posts, currentPage, loadPosts}) => {
    useEffect(() => {
        loadPosts();
        console.log(posts);
    }, []);

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
                    {posts.map((post) => <TableRow key={post.id} id={post.id} title={post.title} body={post.body} />)}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
