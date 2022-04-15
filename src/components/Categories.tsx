import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, selectCategoryId } from '../redux/reducers/filters-reducer'

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

export const Categories: React.FC = () => {
   const categoryId = useSelector(selectCategoryId)
   const dispatch = useDispatch()

   return (
      <div className="categories">
         <ul>
            {categories.map((text, i) => (
               <li
                  key={text}
                  className={categoryId === i ? 'active' : ''}
                  onClick={() => dispatch(setCategoryId(i))}>
                  {text}
               </li>
            ))}
         </ul>
      </div>
   )
}
