import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gameService from "../../services/game.service";

function CreateGame(props) {
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
                navigate(`/games/${newGame._id}`);
            })
            .catch((error) => {
                console.log(error);
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Create new game</h3>

                <label htmlFor="name-input">Name</label>
                <input type="text" id="name-input" value={gameName} onChange={handleGameName} />
                <br />
                <label htmlFor="informations-input">Information</label>
                <input type="text" id="informations-input" value={gameInformations} onChange={handleGameInformations} />
                <br />
                <label htmlFor="image-url-input">Image URL</label>
                <input type="text" id="image-url-input" value={gameImageURL} onChange={handleGameImageURL} />
                <br />

                <button type="submit">Create game</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    )
}

export default CreateGame;