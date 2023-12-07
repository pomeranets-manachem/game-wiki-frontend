import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gameService from "../../services/game.service";

function GameCreate(props) {
    const [gameName, setGameName] = useState('');
    const [gameInformations, setGameInformations] = useState('');
    const [gameImageURL, setGameImageURL] = useState('');

    const [errorMessage, setErrorMessage] = useState(undefined)

    const navigate = useNavigate();

    const handleGameName = (e) => setGameName(e.target.value);
    const handleGameInformations = (e) => setGameInformations(e.target.value);
    const handleGameImageURL = (e) => setGameImageURL(e.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestBody = {
            name: gameName,
            informations: gameInformations,
            imageURL: gameImageURL
        }

        gameService
            .createGame(requestBody)
            .then((response) => {
                const newGame = response.data;
                navigate(`/games/details/${newGame._id}`);
            })
            .catch((error) => {
                console.log(error);
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    return (
        <div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <h3>Create new game</h3>

                <label htmlFor="game-name-input">Name</label>
                <input type="text" id="game-name-input" value={gameName} onChange={handleGameName} />
                <br />
                <label htmlFor="game-informations-input">Information</label>
                <input type="text" id="game-informations-input" value={gameInformations} onChange={handleGameInformations} />
                <br />
                <label htmlFor="game-image-url-input">Image URL</label>
                <input type="text" id="game-image-url-input" value={gameImageURL} onChange={handleGameImageURL} />
                <br />

                <button type="submit">Create game</button>
            </form>

        </div>
    )
}

export default GameCreate;