import { useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import { gameAPI } from '../api/index.js';
import useAuth from '../hooks/useAuth.js';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleStartGame = async () => {
        setLoading(true);
        try {
            await gameAPI.create();
            navigate('/game');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-4">
            <Row className="text-center mb-3">
                <Col>
                    <h1 className="fw-bold">Last Race</h1>
                    <p className="text-muted">
                        Plan your route racing against the clock and collect coins across a the underground network.
                    </p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card className="bg-light">
                        <Card.Body className="p-4">
                            <Card.Title as="h2" className="mb-4">
                                How to Play
                            </Card.Title>
                            <ListGroup className="gap-3 ">
                                <ListGroup.Item className="border-0 bg-light">
                                    <h3 className="h5">1. Setup Phase</h3>
                                    <Card.Text className="text-muted">
                                        Memorize the subway map with all stations, connections and lines.
                                    </Card.Text>
                                </ListGroup.Item>
                                <ListGroup.Item className="border-0 bg-light">
                                    <h3 className="h5">2. Planning Phase</h3>
                                    <Card.Text className="text-muted">
                                        You are assigned a random start and destination station. <br />You have exactly <strong>90 seconds</strong> to create a route between them selecting stations sequentially.
                                    </Card.Text>
                                </ListGroup.Item>
                                <ListGroup.Item className="border-0 bg-light">
                                    <h3 className="h5">3. Execution Phase</h3>
                                    <Card.Text className="text-muted">
                                        If your route is valid, your train will proceed station-by-station. <br />Random dynamic events will add or deduct coins from your starting pool of 20.
                                    </Card.Text>
                                </ListGroup.Item>
                                <ListGroup.Item className="border-0 bg-light">
                                    <h3 className="h5">4. Final Results</h3>
                                    <Card.Text className="text-muted">
                                        If you reach the destination with more that 0 coins, you win! <br />Your best score will be added to the global leaderboard.
                                    </Card.Text>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {user && (
                     <Row lg={3} className="my-4 justify-content-center">
                        <Button 
                            variant="success" 
                            size="lg" 
                            onClick={handleStartGame} 
                            className="fw-bold py-3"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Start Game'}
                        </Button>
                    </Row>
            )}

            {error && (
                <Row className="justify-content-center">
                    <p className="text-danger">Error: {error}</p>
                </Row>
            )}
        </Container>
    );
};

export default Home;