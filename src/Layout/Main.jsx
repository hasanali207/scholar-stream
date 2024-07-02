import { Outlet } from "react-router-dom"
import Footer from "../Pages/Shared/Footer"
import Navbar from "../Pages/Shared/Navbar"

const Main = () => {
  return (
    <div >
        <Navbar></Navbar>
       <div className="max-w-7xl mx-auto">
       <Outlet></Outlet>
       </div>
        <Footer></Footer>
    </div>
  )
}

export default Main