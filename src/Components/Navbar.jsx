import React from 'react'
// import { BiSolidHomeHeart } from "react-icons/bi";
import { GiDogHouse } from "react-icons/gi";
import {Link} from "react-router-dom"
const Navbar = () => {
  return (
    <div className='px-3 py-4 h-full fixed lg:w-[20%] hidden lg:block navbar-2'>
      <Link to='/' className=' flex items-center p-2 gap-3 rounded-[1.3rem] home text-white cursor-pointer text-center'>
        <div className='p-2 rounded-[1.3rem] header'><GiDogHouse size={20}/></div>
        <p className='text-center mx-auto font-bold nav'>Home</p>
      </Link>
    </div>
  )
}

export default Navbar
