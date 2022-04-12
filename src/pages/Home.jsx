import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import { setFilters, selectFilters } from '../redux/reducers/filters-reducer'
import { fetchProducts, selectProducts } from '../redux/reducers/products-reducer'

import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { ProductItem, Skeleton } from '../components/ProductItem'
import { Pagination } from '../components/Pagination/Pagination'

export function Home() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const isSearch = useRef(false)
   const isMounted = useRef(false)

   const { items, status } = useSelector(selectProducts)
   const { categoryId, sort, searchValue, currentPage } = useSelector(selectFilters)

   const getProducts = async () => {
      const params = new URLSearchParams({
         sortBy: sort,
         limit: 4,
         page: currentPage,
      })

      categoryId !== 0 && params.append('category', categoryId)
      searchValue && params.append('search', searchValue)

      const urlParams = params.toString()

      dispatch(fetchProducts(urlParams))

      window.scrollTo(0, 0)
   }

   useEffect(() => {
      if (isMounted.current) {
         const queryString = qs.stringify({
            sort,
            categoryId,
            currentPage,
         })
         navigate(`?${queryString}`)
      }
      isMounted.current = true
   }, [sort, categoryId, currentPage]) //eslint-disable-line

   useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1))
         dispatch(setFilters(params))

         isSearch.current = true
      }
   }, []) //eslint-disable-line

   useEffect(() => {
      if (!isSearch.current) getProducts()
      isSearch.current = false
   }, [categoryId, sort, searchValue, currentPage]) //eslint-disable-line

   const productsArray = status === 'success' && items.map(item => <ProductItem key={item.id} {...item} />)
   const skeletonsArray = [...Array(4)].map((_, i) => <Skeleton key={i} className="pizza-block" />)

   return (
      <div className="container">
         <div className="content__top">
            <Categories />
            <Sort />
         </div>

         <h2 className="content__title">Все пиццы</h2>
         {status === 'error' && (
            <div className="content__error">
               <h2>
                  Произошла ошибка <span>😕</span>
               </h2>
               <p>Не удалось загрузить пиццы. Попробуйте повторить попытку позже.</p>
            </div>
         )}
         <div className="content__items">{status === 'loading' ? skeletonsArray : productsArray}</div>
         <Pagination />
      </div>
   )
}
