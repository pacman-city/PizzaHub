import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import { useAppDispatch } from '../redux/store'
import { setFilters, selectFilters } from '../redux/reducers/filters-reducer'
import { fetchProducts, selectProducts } from '../redux/reducers/products-reducer'

import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { ProductItem, Skeleton } from '../components/ProductItem'
import { Pagination } from '../components/Pagination/Pagination'

export const Home: React.FC = () => {
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const isSearch = useRef(false)
   const isMounted = useRef(false)

   const { items, status } = useSelector(selectProducts)
   const { categoryId, sortBy, searchValue, currentPage } = useSelector(selectFilters)

   const getProducts = async () => {
      const params = new URLSearchParams(
         {
            'sortBy': sortBy,
            'limit': '4',
            'page': currentPage.toString(),
         })

      categoryId !== 0 && params.append('category', String(categoryId))
      searchValue && params.append('search', searchValue)

      const urlParams = params.toString()

      dispatch(fetchProducts(urlParams))

      window.scrollTo(0, 0)
   }

   useEffect(() => {
      if (isMounted.current) {
         const queryString = qs.stringify({
            sortBy,
            categoryId,
            currentPage,
         })
         navigate(`?${queryString}`)
      }
      isMounted.current = true
   }, [sortBy, categoryId, currentPage]) //eslint-disable-line

   useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1))

         dispatch(setFilters({
            categoryId: Number(params.categoryId),
            currentPage: Number(params.currentPage),
            // @ts-ignore
            sortBy: params.sortBy,
         }))

         isSearch.current = true
      }
   }, []) //eslint-disable-line

   useEffect(() => {
      if (!isSearch.current) getProducts()
      isSearch.current = false
   }, [categoryId, sortBy, searchValue, currentPage]) //eslint-disable-line

   const productsArray = (status === 'success') && items.map((item: any) => <ProductItem {...item} key={item.id} />)
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
