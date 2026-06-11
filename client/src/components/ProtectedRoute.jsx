import useAuth from '../hooks/useAuth.js';
import { Navigate, Outlet, useNavigate} from 'react-router';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        navigate('/login');
        return;
    }

    return <Outlet />;
}

export default ProtectedRoute;