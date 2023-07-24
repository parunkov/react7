import './App.css';
import { useEffect } from 'react';
// import store from './redux/store';
import TableContainer from './components/Table/TableContainer';
import Pagination from './components/Pagination/PaginationContainer';

function App() {
  useEffect(() => {
    // console.log(2222);
    // const a = async () => {
    //   const response = await fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=10');
    //   console.log("🚀 ~ file: posts-reducer.js:28 ~ loadPosts ~ response:", response);
    //   const posts = await response.json();
    //   console.log("🚀 ~ file: posts-reducer.js:30 ~ loadPosts ~ posts:", posts);
    // };
    // a();
    // console.log(store);
  }, []);

  return (
    <div className="App">
      <TableContainer />
      <Pagination />
    </div>
  );
}

export default App;
