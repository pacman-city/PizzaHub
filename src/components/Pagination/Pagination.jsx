import ReactPaginate from 'react-paginate'
import { useDispatch } from 'react-redux'
import { setCurrentPage } from '../../redux/reducers/filters-reducer'
import styles from './Pagination.module.scss'

export function Pagination() {
   const dispatch = useDispatch()

   return (
      <ReactPaginate
         className={styles.pagination}
         breakLabel="..."
         nextLabel=">"
         previousLabel="<"
         onPageChange={event => dispatch(setCurrentPage(event.selected + 1))}
         pageRangeDisplayed={3}
         pageCount={3}
         renderOnZeroPageCount={null}
      />
   )
}
