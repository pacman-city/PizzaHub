import { useRef, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'
import { setSearchValue } from '../../redux/reducers/filters-reducer'
import styles from './serch.module.scss'

export const Search: React.FC = () => {
   const [searchInput, setSearchInput] = useState('')
   const dispatch = useDispatch()

   const inputRef = useRef<HTMLInputElement>(null)

   const onClickHandler = () => {
      dispatch(setSearchValue(''))
      setSearchInput('')
      inputRef.current?.focus()
   }

   const requestSearch = useCallback(
      debounce((value: string) => dispatch(setSearchValue(value)), 300),
      [])

   const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.target.value)
      requestSearch(event.target.value)
   }

   return (
      <div className={styles.container}>
         <svg className={styles.icon} height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
            <path
               d="M31 28h-1.59l-.55-.55c1.96-2.27 3.14-5.22 3.14-8.45 0-7.18-5.82-13-13-13s-13 5.82-13 13 5.82 13 13
            13c3.23 0 6.18-1.18 8.45-3.13l.55.55v1.58l10 9.98 2.98-2.98-9.98-10zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9
            4.03 9 9-4.03 9-9 9z"
            />
            <path d="M0 0h48v48h-48z" fill="none" />
         </svg>
         <input
            ref={inputRef}
            className={styles.input}
            value={searchInput}
            onChange={changeHandler}
            type="text"
            placeholder="Поиск пиццы..."
         />
         {searchInput && (
            <svg
               onClick={onClickHandler}
               className={styles.clearIcon}
               width="22"
               height="22"
               viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  d="M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,
                  0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,
                  0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4 l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z"
               />
            </svg>
         )}
      </div>
   )
}
