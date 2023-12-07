import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import gameService from "../../services/game.service";

function GameDetail(props) {
    const [game, setGame] = useState()

    const [errorMessage, setErrorMessage] = useState(undefined)

    const { gameId } = useParams();

    useEffect(() => {
        gameService
            .getGame(gameId)
            .then((response) => {
                setGame(response.data[0]);
            })
            .catch((error) => {
                console.log("API: Error while getting the details of a game")
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }, []);

    return (
        <div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <h1>Game Details</h1>
            <ul>
                {game &&
                    <>
                        <li>Name: {game.name}</li>
                        <li>Information: {game.informations}</li>
                        <li>Image URL: {game.imageURL}</li>
                    </>
                }
            </ul>
        </div>
    )
}

export default GameDetail;