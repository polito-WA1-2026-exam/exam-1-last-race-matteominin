import { Card, ListGroup, Badge } from "react-bootstrap";

// TODO: shuffle segments
const AvailableConnections = ({ map, selectedSegments, getStationName, getLineName, timeLeft, addSegment, getLineColor}) => {
    return (
        <Card>
            <Card.Header className="bg-primary text-white fw-bold">
                Available Connections
            </Card.Header>
            <Card.Body>
                <ListGroup>
                    {map.segments?.map((segment, index) => {
                        const isSelected = selectedSegments.some(
                            s => s.station1_id === segment.station1_id && s.station2_id === segment.station2_id && s.line_id === segment.line_id
                        );
                        
                        const lineName = getLineName(segment.line_id);

                        return (
                            <ListGroup.Item 
                                key={index}
                                action
                                onClick={() => addSegment(segment)}
                                disabled={isSelected || timeLeft <= 0}
                                className="d-flex justify-content-between align-items-center my-1 border"
                                style={{ backgroundColor: isSelected ? '#e9ecef' : '#f8f9fa' }}
                            >
                                <div className="d-flex flex-column align-items-start">
                                    <span className={isSelected ? 'text-muted text-decoration-line-through' : ''}>
                                        {getStationName(segment.station1_id, map.stations)} — {getStationName(segment.station2_id, map.stations)}
                                    </span>

                                    <Badge bg={getLineColor(lineName)}>
                                        {lineName} Line
                                    </Badge>
                                </div>
                                
                                <Badge bg={isSelected ? 'secondary' : 'primary'} pill>
                                    {isSelected ? 'Selected' : '+'}
                                </Badge>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

export default AvailableConnections;