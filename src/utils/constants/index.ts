export const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL as string;

export const path = {
    HOME: '/*',
    AUTH:{
        ACCOUNT:'/account/*',
        LOGIN: 'login',
        REGISTER:'register',
        FORGOTPASSWORD:'forgot-password',
        RESETPASSWORD:'reset-password/:email',
    }
    
}