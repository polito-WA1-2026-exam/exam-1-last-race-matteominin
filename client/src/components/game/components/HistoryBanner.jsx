import { Card, ListGroup, Badge } from "react-bootstrap";

const HistoryBanner = ({currentCoins, pastSteps, getStationName}) => {
    return (
        <>
            <Card className="text-center bg-dark text-white">
                <Card.Body>
                    <h4 className="text-white fw-bold">CURRENT TOTAL</h4>
                    <div className="display-2 fw-bold text-light">
                        {currentCoins} <span className="fs-4 text-warning">Coins</span>
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
                            {pastSteps.map((s, idx) => (
                                <ListGroup.Item key={idx} className="px-3">
                                    <div className="d-flex justify-content-between">
                                        <span className="small text-secondary">
                                            {getStationName(s.fromStationId)} <i className="bi bi-arrow-right-short"></i> {getStationName(s.toStationId)}
                                        </span>
                                        <Badge bg={s.effect > 0 ? "success" : "danger"}>
                                            {s.effect > 0 && "+"}{s.effect}
                                        </Badge>
                                    </div>
                                    <small className="text-secondary">
                                        {s.eventName}
                                    </small>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Card.Body>
            </Card>
        </>
    )
}

export default HistoryBanner;