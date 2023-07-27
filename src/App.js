import './App.css';
import TableContainer from './components/Table/TableContainer';
import Pagination from './components/Pagination/PaginationContainer';

function App() {
  return (
    <div className="App">
      <div className="container">
        <TableContainer />
        <Pagination />
      </div>
    </div>
  );
}

export default App;
