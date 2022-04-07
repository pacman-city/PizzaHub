import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

export function Pagination({ onPageChangeHandler }) {
   const handlePageClick = event => {
      onPageChangeHandler(event.selected + 1)
   }
   const pageCount = 3

   return (
      <ReactPaginate
         className={styles.pagination}
         breakLabel="..."
         nextLabel=">"
         previousLabel="<"
         onPageChange={handlePageClick}
         pageRangeDisplayed={3}
         pageCount={pageCount}
         renderOnZeroPageCount={null}
      />
   )
}
