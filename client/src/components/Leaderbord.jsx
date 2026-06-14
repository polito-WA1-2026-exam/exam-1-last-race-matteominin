import { useEffect, useState } from "react";
import { leaderboardAPI } from "../api";
import { Container, Table, Spinner, Row, Alert } from "react-bootstrap";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const data = await leaderboardAPI.getLeaderboard();
                setLeaderboard(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchLeaderboard();
    }, []);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <h1 className="mb-4">Leaderboard</h1>
                <Spinner animation="border" variant="primary" className="mt-3 mb-2" />
                <p className="text-muted">Loading leaderboard...</p>
            </Container>
        );
    }

    return (
        <Container>
            <h1>Leaderboard</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="text-center">No entries yet</td>
                        </tr>
                    )
                    : (
                        leaderboard.map((entry, index) => (
                            <tr key={entry.username}>
                                <td>{index + 1}</td>
                                <td>{entry.username}</td>
                                <td>{entry.record} Coins</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
            {error && (
                <div className="alert alert-danger text-center p-2 mt-3 small" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
                </div>
            )}
        </Container>
    );
}

export default Leaderboard;