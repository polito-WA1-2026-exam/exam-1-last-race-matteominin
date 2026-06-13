import { Row, Col, Card, Badge } from "react-bootstrap"

const JourneyStatus = ({ 
    isFinished, 
    gameStatus, 
    currentStepIndex,
    currentStep,
    totalSteps,
    getStationName
}) => {
    if (isFinished && gameStatus === 'WON') {
        return (
            <Row className="text-center mt-3">
                <i className="bi bi-flag-fill text-success display-3"></i>
                <h3 className="fw-bold text-dark">You Arrived!</h3>
                <p className="text-muted">
                    All events calculated. Check your final balance and history on the right.
                </p>
            </Row>
        )
    }

    if (isFinished && gameStatus === 'LOST') {
        return (
            <p>lost</p>
        )
    }

    return (
        <Card>
            <Card.Header className="bg-primary text-white fw-bold">
                Current Journey Segment ({currentStepIndex + 1} / {totalSteps})
            </Card.Header>
            <Card.Body className="d-flex text-center">
                <Col>
                    <small className="text-muted d-block fw-bold">FROM</small>
                    <Badge bg="dark" className="fs-5 px-4">{getStationName(currentStep.fromStationId)}</Badge>
                </Col>
                
                <Col>
                    <Row>
                        <i className="bi bi-train-front display-6"></i>
                    </Row>
                    <Row>
                        <small>In transit...</small>
                    </Row>
                </Col>
                
                <Col>
                    <small className="text-muted d-block fw-bold">TO</small>
                    <Badge bg="dark" className="fs-5 px-4">{getStationName(currentStep.toStationId)}</Badge>
                </Col>
            </Card.Body>
        </Card>
    )
}

export default JourneyStatus;