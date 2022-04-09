import { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { ProductItem, Skeleton } from '../components/ProductItem'
import { Pagination } from '../components/Pagination/Pagination'
import { SearchContext } from '../App'

export function Home() {
   const { categoryId, sort } = useSelector(state => state.filter)

   const { searchValue } = useContext(SearchContext)
   const [products, setProducts] = useState(null)
   const [currentPage, setCurrentPage] = useState(1)

   useEffect(() => {
      setProducts(null)
      const sortQ = `&sortBy=${sort}`
      const categoryQ = categoryId !== 0 ? '&category=' + categoryId : ''
      const orderQ = '&order=desc'
      const searchQ = searchValue ? `&search=${searchValue}` : ''
      const paginationQ = `limit=4&page=${currentPage}`
      const queryString = paginationQ + sortQ + categoryQ + orderQ + searchQ

      fetch(`https://63481a210484786c6e91d7a6.mockapi.io/items?${queryString}`)
         .then(res => res.json())
         .then(data => setProducts(data))
      window.scrollTo(0, 0)
   }, [categoryId, sort, searchValue, currentPage])

   const onPageChangeHandler = pageNum => {
      setCurrentPage(pageNum)
   }

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
         <Pagination onPageChangeHandler={onPageChangeHandler} />
      </div>
   )
}
