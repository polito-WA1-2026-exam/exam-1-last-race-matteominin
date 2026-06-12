import { Container, Button, Image, Col, Row } from 'react-bootstrap';
import mapComplete from '../../assets/map.jpg'; 

const GameSetup = ({ startGame }) => {
    return (
        <Container className="py-4 text-center d-flex flex-column align-items-center">
            
            <div className="mb-4">
                <h2 className="fw-bold text-primary mb-2">Phase 1: Game Setup</h2>
                <p className="text-muted">
                    Study the layout of the underground network carefully. Your departure and arrival stations will be revealed in the next phase!
                </p>
            </div>

            <Image 
                src={mapComplete} 
                alt="Network Map"  
                thumbnail 
                style={{ maxHeight: '60vh', objectFit: 'contain' }}
            />

            <Button 
                variant="success" 
                size="lg" 
                className="fw-bold px-5 py-3 my-4"
                onClick={startGame}
            >
                Start
            </Button>
        </Container>
    );
};

export default GameSetup;