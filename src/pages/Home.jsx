import { useEffect, useState } from 'react'
import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { ProductItem, Skeleton } from '../components/ProductItem'

export function Home() {
   const [products, setProducts] = useState(null)

   useEffect(() => {
      fetch('https://63481a210484786c6e91d7a6.mockapi.io/items')
         .then(res => res.json())
         .then(data => setProducts(data))
      window.scrollTo(0, 0)
   }, [])

   return (
      <div className="container">
         <div className="content__top">
            <Categories />
            <Sort />
         </div>

         <h2 className="content__title">Все пиццы</h2>

         <div className="content__items">
            {products
               ? products.map(item => <ProductItem key={item.id} {...item} />)
               : [...Array(6)].map((_, i) => <Skeleton key={i} className="pizza-block" />)}
         </div>
      </div>
   )
}
