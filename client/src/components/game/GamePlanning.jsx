import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Container, Button, Col, Card, Badge, Row, Image} from 'react-bootstrap';
import AvailableConnections from './components/AvailableConnections.jsx';
import SelectedRoute from './components/SelectedRoute.jsx'
import mapImg from '../../assets/map_no_segments.jpg';

const GamePlanning = ({game, map, submitRoute, getStationName}) => {
    const timeLimit = 90; 

    const [timeLeft, setTimeLeft] = useState(() => {
        const now = dayjs();
        const start = dayjs(game.startedAt);
        const elapsed = now.diff(start, 'second');
        return Math.max(timeLimit - elapsed, 0);
    });

    const [selectedSegments, setSelectedSegments] = useState([]);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            const now = dayjs();
            const start = dayjs(game.startedAt);
            const elapsed = now.diff(start, 'second');
            const remaining = timeLimit - elapsed;

            setTimeLeft(remaining);

            if (remaining <= 0) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [game.startedAt]);

    useEffect(() => {
        if (timeLeft <=0) {
            submitRoute(selectedSegments);
        }
    }, [timeLeft])

    const getLineName = (lineId) => {
        const line = map.lines.find(l => l.id === lineId);
        return line ? line.name : `Linea ${lineId}`;
    };

    const resetSegments = () => {
        setSelectedSegments([]);
    }

    const addSegment = (segment) => {
        setSelectedSegments([...selectedSegments, segment]);
    }

    const removeSegment = (segment) => {
        setSelectedSegments(prev => prev.filter(s => s.id !== segment.id));
    }

    const getLineColor = (lineName) => {
        let color;

        switch (lineName.toLowerCase()) {
            case 'red':
                color = 'danger';
                break;

            case 'yellow':
                color = 'warning';
                break;
            
            case 'green':
                color = 'success';
                break;

            case 'blue':
                color = 'primary';
                break;
            
            }
        return color;
    }

    return (
        <Container className="py-4 text-center">
            
            <div className="mb-4">
                <h2 className="fw-bold text-primary mb-2">Phase 2: Game Planning</h2>
                <p className="text-muted mb-3">
                    Select your route on the map below. Connect the departure station to the arrival station before time runs out!
                </p>
                
                <div 
                    className="position-fixed bottom-0 end-0 m-4 px-3 py-2 rounded-5 bg-danger text-white" 
                    style={{ zIndex: 100 }}
                >
                    <i className="bi bi-alarm me-2 fs-5"></i>
                    <span className="fs-5">
                        <span>{timeLeft}</span>s
                    </span>
                </div>
            </div>

            <Card className="mb-4 py-3 bg-light d-flex flex-row justify-content-around align-items-center">
                <div>
                    <small className="text-muted d-block fw-bold">DEPARTURE</small>
                    <Badge bg="primary" className="fs-5 px-4">{getStationName(game.startStationId, map.stations)}</Badge>
                </div>
                
                <i className="bi bi-arrow-right fs-3"></i>
                
                <div>
                    <small className="text-muted d-block fw-bold">ARRIVAL</small>
                    <Badge bg="primary" className="fs-5 px-4">{getStationName(game.endStationId, map.stations)}</Badge>
                </div>
            </Card>

            <Image 
                src={mapImg} 
                alt="Network Map without segments"  
                thumbnail
                className="mb-4"
                style={{ maxHeight: '40vh', objectFit: 'contain' }}
            />

            <Row className="g-4 mb-4">
                <Col md={6}>
                    <AvailableConnections 
                        map={map} 
                        selectedSegments={selectedSegments} 
                        getStationName={getStationName}
                        getLineName={getLineName}
                        timeLeft={timeLeft}
                        addSegment={addSegment}
                        getLineColor={getLineColor}
                    />
                </Col>

                <Col md={6}>
                    <SelectedRoute 
                        map={map} 
                        selectedSegments={selectedSegments} 
                        getStationName={getStationName}
                        getLineName={getLineName}
                        timeLeft={timeLeft}
                        removeSegment={removeSegment}
                        getLineColor={getLineColor}
                    />
                </Col>
            </Row>

            <div className="mt-4 d-flex gap-3 justify-content-center">
                <Button 
                    variant="secondary" 
                    size="lg" 
                    className="px-4"
                    onClick={resetSegments}
                >
                    <i className="bi bi-arrow-counterclockwise"></i>
                </Button>
                
                <Button 
                    variant="success" 
                    size="lg" 
                    className="fw-bold px-5 py-3"
                    onClick={() => submitRoute(selectedSegments)}
                >
                    Confirm Route
                    <i className="bi bi-check-circle ms-3"></i>
                </Button>
            </div>

        </Container>
    );
};

export default GamePlanning;