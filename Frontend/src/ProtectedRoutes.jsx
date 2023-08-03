import { Outlet, Navigate } from 'react-router-dom'
import Forbidden from './routes/protected/forbidden'

const ProtectedRoutes = () => {
    
    if(sessionStorage.getItem('accessToken')) {

        if(sessionStorage.getItem('role')!='Admin'){
            return <Forbidden />
        }

        return <Outlet />
    }
    else {
        return <Navigate to='/login' />
    }
}

export default ProtectedRoutes