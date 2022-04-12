import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'
import axios from 'axios'

import { setFilters } from '../redux/reducers/filter-reducer'

import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { ProductItem, Skeleton } from '../components/ProductItem'
import { Pagination } from '../components/Pagination/Pagination'

export function Home() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const isSearch = useRef(false)
   const isMounted = useRef(false)

   const { categoryId, sort, searchValue, currentPage } = useSelector(state => state.filter)

   const [products, setProducts] = useState(null)

   const fetchPizzas = () => {
      setProducts(null)
      const params = new URLSearchParams({
         sortBy: sort,
         limit: 4,
         page: currentPage,
      })
      categoryId !== 0 && params.append('category', categoryId)
      searchValue && params.append('search', searchValue)

      axios.get(`https://63481a210484786c6e91d7a6.mockapi.io/items?${params.toString()}`).then(res => {
         setProducts(res.data)
      })
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
      window.scrollTo(0, 0)
      if (!isSearch.current) fetchPizzas()
      isSearch.current = false
   }, [categoryId, sort, searchValue, currentPage]) //eslint-disable-line

   const productsArray = products && products.map(item => <ProductItem key={item.id} {...item} />)
   const skeletonsArray = [...Array(4)].map((_, i) => <Skeleton key={i} className="pizza-block" />)

   return (
      <div className="container">
         <div className="content__top">
            <Categories />
            <Sort />
         </div>

         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">{products ? productsArray : skeletonsArray}</div>
         <Pagination />
      </div>
   )
}
