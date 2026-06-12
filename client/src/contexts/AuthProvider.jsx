import {useState, useEffect} from 'react';
import AuthContext from './AuthContext.jsx';
import { authAPI } from '../api/index.js';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifySession = async () => {
            try {
                const res = await authAPI.getCurrentSession();

                if (res) {
                    setUser(res);
                }
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        verifySession();
    }, []);

    const login = async (username, password) => {
        setLoading(true);
        try {
            const res = await authAPI.login(username, password);
            setUser(res);
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        setLoading(true);
        try {
            const res = await authAPI.logout();
            setUser(null);
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext value={{ user, loading, login, logout }}>
            {children}
        </AuthContext>
    );
}

export default AuthProvider;