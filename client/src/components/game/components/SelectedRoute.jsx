import { Card, ListGroup, Badge, Button } from "react-bootstrap";

const SelectedRoute = ({ map, selectedSegments, getStationName, getLineName, timeLeft, removeSegment}) => {
    return (
        <Card className="h-100">
            <Card.Header className="bg-primary text-white fw-bold">
                <i className="bi bi-signpost-2 me-2"></i> Your Route
            </Card.Header>
            <Card.Body>
                {selectedSegments.length === 0 ? (
                        <div className="text-center text-muted mt-4">
                            <em>No connections selected yet. Click on the list to add segments sequentially.</em>
                        </div>
                    ) : (
                        <ListGroup>
                            {selectedSegments.map((segment, idx) => {
                                const lineName = getLineName(segment.line_id);

                                // TODO: change color
                                const badgeColor = lineName.toLowerCase() === 'rossa' ? 'danger' : 
                                                lineName.toLowerCase() === 'gialla' ? 'warning text-dark' : 'secondary'; 
                                return (
                                    <ListGroup.Item 
                                        key={idx}
                                        className="d-flex justify-content-between align-items-center my-1 border"
                                    >
                                        <div className="d-flex align-items-center">
                                            <Badge bg="primary" className="me-2 rounded-circle">{idx + 1}</Badge>
                                            <div className="d-flex flex-column align-items-start">
                                                <span className="fw-bold">
                                                    {getStationName(segment.station1_id, map.stations)} — {getStationName(segment.station2_id, map.stations)}
                                                </span>
                                                <Badge bg={badgeColor}>
                                                    {lineName} Line
                                                </Badge>
                                            </div>
                                        </div>
                                        <Button 
                                            variant="link" 
                                            className="text-danger p-0"
                                            onClick={() => removeSegment(segment)}
                                            disabled={timeLeft <= 0}
                                        >
                                            <i className="bi bi-x-circle-fill fs-5"></i>
                                        </Button>
                                    </ListGroup.Item>
                                )
                            })}
                        </ListGroup>
                )}
            </Card.Body>
        </Card>
    )
}

export default SelectedRoute;