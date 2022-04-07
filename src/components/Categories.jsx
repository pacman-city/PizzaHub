const categoryType = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

export function Categories({ activeCategory, setActiveCategory }) {
   return (
      <div className="categories">
         <ul>
            {categoryType.map((text, i) => (
               <li key={text} className={activeCategory === i ? 'active' : ''} onClick={() => setActiveCategory(i)}>
                  {text}
               </li>
            ))}
         </ul>
      </div>
   )
}
