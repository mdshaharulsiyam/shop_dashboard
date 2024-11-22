
import { useGetProfileQuery } from '../Redux/Apis/authApi'
import Loading from '../Components/Shared/Loading'
import { Navigate, useLocation } from 'react-router-dom'

const VendorRoutes = ({ children }) => {
    const location = useLocation()
    if (!localStorage.getItem('token')) return <Navigate to={`/login`} state={location.pathname} ></Navigate>
    const { data, isLoading, isError, error, isFetching } = useGetProfileQuery()
    if (isLoading || isFetching) return <Loading />
    if (isError) {
        return <Navigate to={`/login`} state={location.pathname} ></Navigate>
    }
    if (data?.data?.role == 'VENDOR') {
        return children
    }
    if (data?.data?.role == 'ADMIN' || data?.data?.role == 'SUPER_ADMIN') {
        return <Navigate to={`/`}  ></Navigate>
    }
    return <Navigate to={`/login`} state={location.pathname} ></Navigate>
}

export default VendorRoutes
