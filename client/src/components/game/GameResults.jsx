import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, ListGroup } from "react-bootstrap"
import JourneyStatus from "./components/JourneyStatus";
import EventBanner from "./components/EventBanner";
import HistoryBanner from "./components/HistoryBanner";

const GameExecution = ({ game, map, getStationName }) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const steps = game.steps;
    const isFinished = currentStepIndex >= steps.length;
    const currentStep = !isFinished ? game.steps[currentStepIndex] : null;

    useEffect(() => {
        if (steps.length === 0) return;

        const timer = setTimeout(() => {
            if (currentStepIndex < steps.length) {
                setCurrentStepIndex(currentStepIndex + 1);
            }
        }, 2000)

        return () => clearTimeout(timer);
    }, [currentStepIndex, steps.length])

    let currentCoins = 20;
    if (isFinished) {
        currentCoins = game.coins;
    } else {
        if (currentStepIndex !== 0) {
            currentCoins = steps[currentStepIndex - 1].coinsAfterStep;
        }
    }

    const pastSteps = steps.slice(0, currentStepIndex);

    return (
        <Container>
            <Row className="text-center mt-4">
                <h1 className="fw-bold text-primary">Phase 3: Execution</h1>
                <p className="text-muted">The train is moving automatically. Please wait until the journey finishes.</p>
            </Row>

            <Row className="mt-4">
                <Col sm={8}>

                    <JourneyStatus 
                        isFinished={isFinished}
                        gameStatus={game.status}
                        currentStepIndex={currentStepIndex}
                        currentStep={currentStep}
                        totalSteps={steps.length}
                        getStationName={getStationName}
                    />

                    <EventBanner currentStep={currentStep} />
                </Col>      

                <Col sm={4}>
                    <HistoryBanner 
                        currentCoins={currentCoins}
                        pastSteps={pastSteps}
                        getStationName={getStationName}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default GameExecution;