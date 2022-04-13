import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export function Layout() {
   return (
      <div className="wrapper">
         <Header />
         <div className="content">
            <Outlet />
         </div>
      </div>
   )
}
