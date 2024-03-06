"use client"
import pillsLogo from '../assets/pills_banner_icon.png';
import { RiAccountCircleFill } from "react-icons/ri";
import { Popover } from 'antd';
import { useState } from 'react';
import { GoPerson } from 'react-icons/go';
import { IoLogOut } from 'react-icons/io5';
import { ImProfile } from 'react-icons/im';
const NavBar = () => {
     const [openPopUp, setOpenPopUp] = useState(false);

     const content = (
          <div className='min-w-[200px]'>
               <div className='flex justify-center py-2 border-b'>
                    <div className='bg-gray-100 rounded-full w-[100px] h-[100px] flex items-center justify-center'>
                         <GoPerson size={50} color='gray' />
                    </div>
               </div>
               <div className='mt-1 text-center text-[18px] font-[500] text-gray-500'>Rahul Gupta</div>
               <div className='text-center text-[12px] text-gray-500'>rg547726@gmail.com</div>
               <div className='border-t mt-2 pt-2'>
                    <div className='flex gap-2 items-center mt-2'>
                         <div>
                              <ImProfile  color='grey' size={18} />
                         </div>
                         <div className='font-[500] text-[grey] text-[16px]'>Profile</div>
                    </div>
                    <div className='flex gap-2 items-center mt-3'>
                         <div>
                              <IoLogOut color='#e63c3cd7' size={24} />
                         </div>
                         <div className='font-[500] text-[#e63c3cd7] text-[16px]'>Log Out</div>
                    </div>
               </div>
          </div>
     )
     return (
          <div className="fixed w-[100%] top-0 flex justify-between bg-green-950 h-[60px] px-4 items-center z-50">
               <div className="flex items-center gap-2">
                    <img className="w-[32px]" src={pillsLogo} alt="pills" />
                    <div className="font-Ultra text-white ">Find My Drugs</div>
               </div>


               <div className="flex gap-4 items-center pr-1">
                    <Popover
                         content={content}
                         trigger="click"
                         open={openPopUp}
                         onOpenChange={() => setOpenPopUp(!openPopUp)}
                    >
                         <RiAccountCircleFill color="white" size={30} />
                    </Popover>

               </div>

          </div>
     )
}

export default NavBar;