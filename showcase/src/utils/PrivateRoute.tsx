import { Navigate, Outlet } from 'react-router-dom'
import SessionService from '../services/session.service'

const PrivateRoute = () => {
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return SessionService.hasToken() ? <Outlet /> : <Navigate to="/login" />
}
export default PrivateRoute
