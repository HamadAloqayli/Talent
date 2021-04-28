import ReactPaginate from 'react-paginate';

const TablePaginate = () => {
    return ( 
        <ReactPaginate pageCount={5} pageRangeDisplayed={2} marginPagesDisplayed={2} />
     );
}
 
export default TablePaginate;