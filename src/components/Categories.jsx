import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/reducers/filter-reducer'

const categoryType = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

export function Categories() {
   const categoryId = useSelector(state => state.filter.categoryId)
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
