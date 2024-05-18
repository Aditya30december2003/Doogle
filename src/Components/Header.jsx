import React , {useState , useEffect} from 'react'
import { CgMenuHotdog } from "react-icons/cg";
import { GiDogHouse } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import {Link} from 'react-router-dom'
const Header = () => {
  const [nav , setNav]=useState(false)
  return (
    <>
    <div className={nav?'home w-[100%] z-10 fixed mt-[0%]  h-[60rem] lg:hidden duration-700':'home z-10 w-[100%] fixed  lg:hidden mt-[-100%] duration-500'}>
    <div className='ml-[93%] mt-5 cursor-pointer' onClick={()=>setNav(!nav)}><ImCross /></div>
    <Link to='/' className='header w-[80%] mx-auto mt-10 flex items-center p-2 gap-3 rounded-[1.3rem] cursor-pointer text-center'>
        <div className=' p-2 rounded-[1.3rem] navbar'><GiDogHouse size={20}/></div>
        <p className='text-center mx-auto font-bold text-style'>Home</p>
      </Link>
    </div>
    <div className={!nav?'w-full py-3 flex  items-center justify-between duration-500':' py-3 flex w-[100%] items-center justify-between duration-300'}>
      <h1 className='text-center mx-auto font-bold text-[2.5rem] text-white text-style'>Doogle!!</h1>
      <div className='mr-5 md:hidden cursor-pointer' onClick={()=>setNav(!nav)} ><CgMenuHotdog size={30} className='text-white'/></div>
    </div>
    </>
  )
}

export default Header
