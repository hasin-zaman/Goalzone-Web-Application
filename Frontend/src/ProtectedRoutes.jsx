import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
    return(
        Boolean(sessionStorage.getItem('accessToken')) && sessionStorage.getItem('role')=="Admin" ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default ProtectedRoutes