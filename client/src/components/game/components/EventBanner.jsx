import { Card, Badge } from "react-bootstrap";

const EventBanner = ({ currentStep }) => {
    if (!currentStep) return null;

    return (
        <Card className="mt-4">
            <Card.Header className="bg-warning fw-bold text-center">
                Unexpected Event Occurred!
            </Card.Header>
            <Card.Body className="py-4 text-start">
                <h5 className="text-dark fw-bold">
                    {currentStep.eventName}
                </h5>
                <p className="text-muted">
                    {currentStep.eventDescription}
                </p>
                <div>
                    <Badge className="me-2 fw-semibold">Effect: {currentStep.effect > 0 && "+"}{currentStep.effect} Coins</Badge>
                </div>
            </Card.Body>
        </Card>
    )
}

export default EventBanner;