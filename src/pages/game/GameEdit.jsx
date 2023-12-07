import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import gameService from "../../services/game.service";

function GameEdit(props) {
    const [game, setGame] = useState()
    const [gameName, setGameName] = useState('');
    const [gameInformations, setGameInformations] = useState('');
    const [gameImageURL, setGameImageURL] = useState('');

    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { gameId } = useParams();

    const handleGameName = (e) => setGameName(e.target.value);
    const handleGameInformations = (e) => setGameInformations(e.target.value);
    const handleGameImageURL = (e) => setGameImageURL(e.target.value);

    useEffect(() => {
        gameService
            .getGame(gameId)
            .then((response) => {
                const uneditedGame = response.data[0];
                setGame(uneditedGame);
                setGameName(uneditedGame.name);
                setGameInformations(uneditedGame.informations);
                setGameImageURL(uneditedGame.imageURL);
            })
            .catch((error) => {
                console.log("API: Error while getting the details of a game")
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestBody = {
            name: gameName,
            informations: gameInformations,
            imageURL: gameImageURL
        }

        gameService
            .editGame(gameId, requestBody)
            .then((response) => {
                const editedGame = response.data;
                navigate(`/games/details/${editedGame._id}`);
            })
            .catch((error) => {
                console.log("API: error while editing a game", error);
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    const handleDelete = (event) => {
        gameService
            .deleteGame(gameId)
            .then((response) => {
                navigate('/')
            })
            .catch((error) => {
                console.log("API: error while deleting a game", error);
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    };

    return (
        <div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
                <h3>Edit game</h3>

                <label htmlFor="game-name-input">Name</label>
                <input type="text" id="game-name-input" value={gameName} onChange={handleGameName} />
                <br />
                <label htmlFor="game-informations-input">Information</label>
                <input type="text" id="game-informations-input" value={gameInformations} onChange={handleGameInformations} />
                <br />
                <label htmlFor="game-image-url-input">Image URL</label>
                <input type="text" id="game-image-url-input" value={gameImageURL} onChange={handleGameImageURL} />
                <br />

                <button type="submit">Save</button>
            </form>

            <br />
            <button onClick={handleDelete}>DELETE</button>
        </div>
    )
}

export default GameEdit;