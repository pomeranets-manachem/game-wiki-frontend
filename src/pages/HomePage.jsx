import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gameService from "../services/game.service";

function HomePage() {
    const [games, setGames] = useState([]);
    const [errorMessage, setErrorMessage] = useState(undefined);

    useEffect(() => {
        gameService
            .getGamesList()
            .then((response) => {
                setGames(response.data);
            })
            .catch((error) => {
                console.log("API: Error while getting the list of games")
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }, []);

    return (
        <div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <h1>Home page</h1>
            <h2>Games list</h2>
            <ul>
                {games && games.map((game) => {
                    return (
                        <li key={game._id}>
                            <Link to={`/game/${game._id}`}>
                                {game.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <Link to="/game/create">
                <button>Create game</button>
            </Link>
        </div>
    );
}

export default HomePage;
