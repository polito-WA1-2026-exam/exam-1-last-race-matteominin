import { Container } from 'react-bootstrap';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <Container className="text-center mt-5">
            <h1>404 Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">Go back to Home</Link>
        </Container>
    )
}

export default NotFound;