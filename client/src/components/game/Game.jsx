import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Container, Image, Col, Spinner } from 'react-bootstrap';
import { gameAPI } from '../../api/index.js';
import GameSetup from './GameSetup.jsx';
import GamePlanning from './GamePlanning.jsx';
import GameExecution from './GameExecution.jsx';
import GameResults from './GameResults.jsx';

const Game = () => {
    const [gameData, setGameData] = useState(null);
    const [mapData, setMapData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);   // TODO: show error

    const navigate = useNavigate();

    useEffect(() => {
        const getGame = async () => {
            try {
                const game = await gameAPI.getCurrent();
                setGameData(game);

                if (game.status === 'STARTED') {
                    const map = await gameAPI.getMap();
                    setMapData(map);
                }
            } catch (err) {
                if (err.status === 404) {
                    navigate('/');
                    return;
                }

                setError(err.message);
            } finally {
                setLoading(false);
            }
        } 
        
        getGame();
    }, []);

    const startGame = async () => {
        setLoading(true);
        try {
            const updatedGame = await gameAPI.start(gameData.id)
            setGameData(updatedGame);

            const map = await gameAPI.getMap();
            setMapData(map);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const submitRoute = async (route) => {
        setLoading(true);
        try {
            const updatedGame = await gameAPI.verifyAndUpdate(route);
            setGameData(updatedGame);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const getStationName = (id, stations) => {
        const station = mapData.stations.find(s => s.id === id);
        return station.name;
    }

    if (!gameData) {
        return null; 
    }

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" className="mt-3 mb-2" />
                <p className="text-muted">Loading game...</p>
            </Container>
        );
    }

    if (gameData.status === 'SETUP') {
        return <GameSetup startGame={startGame}/>;
    } else if (gameData.status === 'STARTED') {
        return <GamePlanning 
            game={gameData} 
            map={mapData} 
            getStationName={getStationName}
            submitRoute={submitRoute}   
        />;
    } else if (gameData.status === 'WON' || gameData.status === 'LOST') {
        return <GameResults 
            game={gameData} 
            map={mapData} 
            getStationName={getStationName}
        />;
    }
}

export default Game;