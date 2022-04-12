import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, selectCategoryId } from '../redux/reducers/filters-reducer'

const categoryType = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

export function Categories() {
   const categoryId = useSelector(selectCategoryId)
   const dispatch = useDispatch()

   return (
      <div className="categories">
         <ul>
            {categoryType.map((text, i) => (
               <li key={text} className={categoryId === i ? 'active' : ''} onClick={() => dispatch(setCategoryId(i))}>
                  {text}
               </li>
            ))}
         </ul>
      </div>
   )
}
