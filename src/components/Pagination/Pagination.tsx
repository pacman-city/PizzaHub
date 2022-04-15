import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage, selectCurrentPage } from '../../redux/reducers/filters-reducer'
import styles from './Pagination.module.scss'

export const Pagination: React.FC = () => {
   const dispatch = useDispatch()
   const currentPage = useSelector(selectCurrentPage)

   return (
      <ReactPaginate
         className={styles.pagination}
         breakLabel="..."
         nextLabel=">"
         previousLabel="<"
         onPageChange={event => dispatch(setCurrentPage(event.selected + 1))}
         pageRangeDisplayed={3}
         pageCount={3}
         forcePage={currentPage - 1}
      />
   )
}
