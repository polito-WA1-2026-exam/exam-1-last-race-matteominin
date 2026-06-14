import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth.js';
import { Form, Button, Container, Spinner, Card } from 'react-bootstrap';

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
        <Container className="d-flex justify-content-center mt-5">
            
            <Card style={{ width: '100%', maxWidth: '400px' }}>
                <Card.Header className="bg-primary text-white text-center fw-bold py-3 fs-5">
                    <i className="bi bi-box-arrow-in-right me-2"></i>Sign In
                </Card.Header>
                
                <Card.Body className="p-4">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        
                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label className="fw-semibold text-secondary">Username</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter your username"
                                name="username"
                                disabled={loading}
                                value={credentials.username}
                                onChange={handleChange}
                                className="py-2"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid username.
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold text-secondary">Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                disabled={loading}
                                value={credentials.password}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid password.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 fw-bold" disabled={loading}>
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
                                'Login'
                            )}
                        </Button>

                        {error && (
                            <div className="alert alert-danger text-center p-2 mt-3 small" role="alert">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
                            </div>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Login;