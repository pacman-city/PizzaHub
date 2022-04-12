import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ContentLoader from 'react-content-loader'
import { addItem, selectCartItem } from '../redux/reducers/cart-reducer'

const pastryTypes = ['тонкое', 'традиционное']

export function ProductItem({ id, imageUrl, title, types, sizes, price, category, rating }) {
   const [activeType, setActiveType] = useState(types[0])
   const [activeSize, setActiveSize] = useState(sizes[0])
   const dispatch = useDispatch()
   const cartItem = useSelector(selectCartItem(id))

   const onClickAdd = () => {
      const item = {
         id,
         title,
         price,
         imageUrl,
         type: pastryTypes[activeType],
         size: activeSize,
      }
      dispatch(addItem(item))
   }

   return (
      <div className="pizza-block">
         <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
         <h4 className="pizza-block__title">{title}</h4>
         <div className="pizza-block__selector">
            <ul>
               {types.map(item => (
                  <li key={item} className={item === activeType ? 'active' : ''} onClick={() => setActiveType(item)}>
                     {pastryTypes[item]}
                  </li>
               ))}
            </ul>
            <ul>
               {sizes.map(item => (
                  <li key={item} className={item === activeSize ? 'active' : ''} onClick={() => setActiveSize(item)}>
                     {item} см.
                  </li>
               ))}
            </ul>
         </div>
         <div className="pizza-block__bottom">
            <div className="pizza-block__price">от {price} ₽</div>
            <div className="button button--outline button--add">
               <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0
                     5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627
                     7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                     fill="white"
                  />
               </svg>
               <span onClick={onClickAdd}>Добавить</span>
               {cartItem && <i>{cartItem.count}</i>}
            </div>
         </div>
      </div>
   )
}

export function Skeleton(props) {
   return (
      <ContentLoader
         speed={2}
         width={280}
         height={465}
         viewBox="0 0 280 465"
         backgroundColor="#f3f3f3"
         foregroundColor="#ecebeb"
         {...props}
      >
         <circle cx="140" cy="132" r="102" />
         <rect x="10" y="250" rx="5" ry="5" width="260" height="20" />
         <rect x="10" y="285" rx="10" ry="10" width="260" height="82" />
         <rect x="11" y="385" rx="14" ry="14" width="95" height="31" />
         <rect x="120" y="382" rx="13" ry="13" width="152" height="45" />
      </ContentLoader>
   )
}
