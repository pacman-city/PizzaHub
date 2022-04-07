import { useEffect, useState } from 'react'
import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { ProductItem, Skeleton } from '../components/ProductItem'
import { Pagination } from '../components/Pagination/Pagination'

export function Home({ searchValue }) {
   const [products, setProducts] = useState(null)
   const [currentPage, setCurrentPage] = useState(1)
   const [activeCategory, setActiveCategory] = useState(0)
   const [sort, setSort] = useState(0)

   useEffect(() => {
      setProducts(null)
      const sortQ = `&sortBy=${['rating', 'price', 'title'][sort]}`
      const categoryQ = activeCategory !== 0 ? '&category=' + activeCategory : ''
      const orderQ = '&order=desc'
      const searchQ = searchValue ? `&search=${searchValue}` : ''
      const paginationQ = `limit=4&page=${currentPage}`
      const queryString = paginationQ + sortQ + categoryQ + orderQ + searchQ

      fetch(`https://63481a210484786c6e91d7a6.mockapi.io/items?${queryString}`)
         .then(res => res.json())
         .then(data => setProducts(data))
      window.scrollTo(0, 0)
   }, [activeCategory, sort, searchValue, currentPage])

   const onPageChangeHandler = pageNum => {
      setCurrentPage(pageNum)
   }

   const productsArray = products && products.map(item => <ProductItem key={item.id} {...item} />)
   const skeletonsArray = [...Array(4)].map((_, i) => <Skeleton key={i} className="pizza-block" />)

   return (
      <div className="container">
         <div className="content__top">
            <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <Sort sort={sort} setSort={setSort} />
         </div>

         <h2 className="content__title">Все пиццы</h2>

         <div className="content__items">{products ? productsArray : skeletonsArray}</div>

         <Pagination onPageChangeHandler={onPageChangeHandler} />
      </div>
   )
}
