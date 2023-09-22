import React from 'react'
import { Outlet } from 'react-router-dom';

interface Props {
    
}

const Account = (props: Props) => {
    return (
        <div>
            <Outlet/>
        </div>
    )
}

export default Account
