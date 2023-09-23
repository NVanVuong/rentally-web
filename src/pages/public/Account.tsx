import React from 'react'
import { Outlet } from 'react-router-dom';
import Logo from '@/assets/images/Logo.svg'
import Cloud from '@/assets/images/cloud.svg'

interface Props {
    
}

const Account = (props: Props) => {
    return (
        <div className='w-full h-full flex'>
            <div className='flex-1 bg-[#1D5868] flex flex-col items-center'>
                <div className='w-full mt-20 px-44 py-4'>
                    <h1 className='text-[#E36414] text-[46px] font-semibold '>Finding a<br/> dream room to rent?</h1>
                    <h4 className='text-white font-normal text-[28px]'>Create your account and start exploration <br/> with us</h4>        
                </div>
                <img src={Logo} alt='' className='w-[632]'/>
                <h3 className='text-white font-normal text-2xl m-16'>Since  2023</h3>
                <img src={Cloud} alt='' className='absolute bottom-0 left-[-70px] w-[560px]'/>
            </div>
            <div className='flex-1 '>
                <Outlet />
            </div>
        </div>
    )
}

export default Account
