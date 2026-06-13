import { useState } from "react";
import { Container, Row, Col, Card, Badge, ListGroup } from "react-bootstrap"

const GameExecution = ({ game, map }) => {
    const [coins, setCoins] = useState(game.coins);
    const pastSteps = ["test"];
    return (
        <Container>
            <Row className="text-center mt-4">
                <h1 className="fw-bold text-primary">Phase 3: Execution</h1>
                <p className="text-muted">The train is moving automatically. Please wait until the journey finishes.</p>
            </Row>

            <Row className="mt-4">
                <Col sm={8}>
                    <Row className="mb-4">
                        <Card className="text-center px-0 border-primary">
                            <Card.Header className="bg-primary text-white fw-bold">
                                Current Journey Segment
                            </Card.Header>
                            <Card.Body className="d-flex justify-content-around">
                                <div>
                                    <small className="text-muted d-block fw-bold">FROM</small>
                                    <Badge bg="dark" className="fs-5 px-4">First</Badge>
                                </div>
                                
                                <div>
                                    <i className="bi bi-train-front d-block display-6"></i>
                                    <small>In transit...</small>
                                </div>
                                
                                <div>
                                    <small className="text-muted d-block fw-bold">TO</small>
                                    <Badge bg="dark" className="fs-5 px-4">Second</Badge>
                                </div>
                            </Card.Body>
                        </Card>
                    </Row>   

                    <Row>
                        <Card className="px-0">
                            <Card.Header className="bg-warning fw-bold text-center">
                                Unexpected Event Occurred!
                            </Card.Header>
                            <Card.Body className="py-4 text-start">
                                <h5 className="text-dark fw-bold">
                                    EVENT NAME
                                </h5>
                                <p className="text-muted">
                                    eventDescription
                                </p>
                                <div>
                                    <Badge className="me-2 fw-semibold">Effect: +4 Coins</Badge>
                                </div>
                            </Card.Body>
                        </Card>
                    </Row>            
                </Col>

                <Col sm={4}>
                    <Card className="text-center bg-dark text-white">
                        <Card.Body>
                            <h4 className="text-white fw-bold">CURRENT TOTAL</h4>
                            <div className="display-2 fw-bold text-light">
                                {coins} <span className="fs-4 text-warning">Coins</span>
                            </div>
                        </Card.Body>
                    </Card>

                    <Card className="mt-4">
                        <Card.Header className="fw-bold text-secondary small text-uppercase">
                            History
                        </Card.Header>
                        <Card.Body className="p-0" style={{ maxHeight: "35vh", overflowY: "auto" }}>
                            {pastSteps.length === 0 ? (
                                <div className="text-center text-muted p-3 small italic">
                                    No segments completed yet.
                                </div>
                            ) : (
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="px-3">
                                        <div className="d-flex justify-content-between">
                                            <span className="small text-secondary">
                                                Prima <i class="bi bi-arrow-right-short"></i> Seconda
                                            </span>
                                            <Badge bg="danger">
                                                +3
                                            </Badge>
                                        </div>
                                        <small className="text-secondary">
                                            eventName
                                        </small>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="px-3">
                                        <div className="d-flex justify-content-between">
                                            <span className="small text-secondary">
                                                Prima <i class="bi bi-arrow-right-short"></i> Seconda
                                            </span>
                                            <Badge bg="danger">
                                                +3
                                            </Badge>
                                        </div>
                                        <small className="text-secondary">
                                            eventName
                                        </small>
                                    </ListGroup.Item>
                                </ListGroup>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default GameExecution;