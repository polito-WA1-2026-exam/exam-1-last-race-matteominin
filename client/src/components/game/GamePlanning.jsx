import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Container, Button, Image, Badge, Card } from 'react-bootstrap';
import mapMuted from '../../assets/map2.jpg'; 

const GamePlanning = ({game, map, submitRoute}) => {
    const timeLimit = 10; 

    const [timeLeft, setTimeLeft] = useState(() => {
        const now = dayjs();
        const start = dayjs(game.startedAt);
        const elapsed = now.diff(start, 'second');
        return Math.max(timeLimit - elapsed, 0);
    });

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
            submitRoute();
        }
    }, [timeLeft])

    const getStation = (id, stations) => {
        const station = stations.find(s => s.id === id);
        return station.name;
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
                    <Badge bg="primary" className="fs-5 px-4">{getStation(game.startStationId, map.stations)}</Badge>
                </div>
                
                <i className="bi bi-arrow-right fs-3"></i>
                
                <div>
                    <small className="text-muted d-block fw-bold">ARRIVAL</small>
                    <Badge bg="danger" className="fs-5 px-4">{getStation(game.endStationId, map.stations)}</Badge>
                </div>
            </Card>


            <Image 
                src={mapMuted} 
                alt="Network Map without segments"  
                thumbnail
                style={{ maxHeight: '60vh', objectFit: 'contain' }}
            />

            <div className="mt-4 d-flex gap-3 justify-content-center">
                <Button 
                    variant="secondary" 
                    size="lg" 
                    className="px-4"
                >
                    <i className="bi bi-arrow-counterclockwise"></i>
                </Button>
                
                <Button 
                    variant="success" 
                    size="lg" 
                    className="fw-bold px-5 py-3"
                    onClick={submitRoute}
                >
                    Confirm Route
                    <i className="bi bi-check-circle ms-3"></i>
                </Button>
            </div>

        </Container>
    );
};

export default GamePlanning;