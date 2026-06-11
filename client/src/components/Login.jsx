import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth.js';
import { Form, Button, Col, Row, Container, Spinner } from 'react-bootstrap';

const Login = () => {
    const { login, loading } = useAuth();

    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setError(null);
        setCredentials({...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }
        
        try {
            await login(credentials.username, credentials.password);
            navigate('/');
        } catch (err) {
            setError(err.message);
            setValidated(false);
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Col className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="username"
                        name="username"
                        disabled={loading}
                        value={credentials.username}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid username.
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        name="password"
                        disabled={loading}
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>

            <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                    <>
                        <Spinner 
                            animation="border" 
                            role="status"
                            size="sm"
                            className="me-2"
                        />
                        Logging in...
                    </>
                ) : (
                    'Submit'
                )}
            </Button>

            {error && <div className="text-danger mt-2">{error}</div>}
        </Form>
    );
}

export default Login;