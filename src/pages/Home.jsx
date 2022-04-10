import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { ProductItem, Skeleton } from '../components/ProductItem'
import { Pagination } from '../components/Pagination/Pagination'

export function Home() {
   const { categoryId, sort, searchValue } = useSelector(state => state.filter)
   const currentPage = useSelector(state => state.page.currentPage)
   const [products, setProducts] = useState(null)

   useEffect(() => {
      setProducts(null)
      const query = [
         `&sortBy=${sort}`,
         categoryId !== 0 ? '&category=' + categoryId : '',
         '&order=desc',
         searchValue ? `&search=${searchValue}` : '',
         `&limit=4&page=${currentPage}`,
      ]
      const queryString = query.join('')

      axios.get(`https://63481a210484786c6e91d7a6.mockapi.io/items?${queryString}`).then(res => {
         setProducts(res.data)
      })
      window.scrollTo(0, 0)
   }, [categoryId, sort, searchValue, currentPage])

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
