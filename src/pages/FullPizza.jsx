import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function FullPizza() {
   const { id } = useParams()
   const [data, setData] = useState(null)
   const navigate = useNavigate()

   useEffect(() => {
      async function fetchPizza() {
         try {
            const { data } = await axios.get('https://63481a210484786c6e91d7a6.mockapi.io/items/' + id)
            setData(data)
         } catch (err) {
            alert('ошибка при получении пиццы')
            navigate('/')
         }
      }
      fetchPizza()
   }, []) // eslint-disable-line

   if (!data) return <p>Загрузка...</p>

   return (
      <div className="container">
         <img src={data.imageUrl} alt="" />
         <h2>{data.title}</h2>
         <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit culpa</p>
         <h4>{data.price} ₽</h4>
      </div>
   )
}
