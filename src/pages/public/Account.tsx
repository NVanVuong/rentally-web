import React from 'react'
import { Outlet } from 'react-router-dom';
import Logo from '@/assets/images/Logo.svg'
import Cloud from '@/assets/images/cloud.svg'

interface Props {
    
} 

const Account = (props: Props) => {
    return (
        <div className='w-screen h-screen bg-gray-200 flex items-center justify-center'> 
            <div className='w-[1200px] h-[800px] flex  '>
                <div className='flex-1 bg-[#1D5868] relative rounded-l-[20px] border flex flex-col items-center'>
                    <div className='w-full mt-16 pt-4 px-16'>
                        <h1 className='text-[#E36414] text-[40px] font-semibold '>Finding a<br/> dream room to rent?</h1>
                        <h4 className='text-white font-normal text-[21px]'>Create your account and start exploration <br/> with us</h4>        
                    </div>
                    <img src={Logo} alt='' className='w-[510px] '/>
                    <h3 className='text-white font-normal text-[21px] m-8'>Since  2023</h3>
                    <img src={Cloud} alt='' className='absolute bottom-0 left-[-71px] w-[560px] z-0'/>
                </div>
                <div className='flex-1 bg-white rounded-r-[20px] border'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Account
