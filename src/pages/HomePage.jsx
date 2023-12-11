import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gameService from "../services/game.service";
import CategorySlider from "../components/CategorySlider";

function HomePage() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        gameService
            .getGamesList()
            .then((response) => {
                setGames(response.data);
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                console.log("API: Error while getting the list of games ", errorDescription)
            })
    }, []);

    return (
        <div className="uk-container uk-text-center homepage">
            <h1>Games Wiki</h1>

            <CategorySlider></CategorySlider>


            <Link to="/games/">
                <button>All Games</button>
            </Link>

            <Link to="/categories/">
                <button>All Categories</button>
            </Link>


            <ul className="uk-list">
                {games && games.map((game) => {
                    return (
                        <li key={game._id}>
                            <Link to={`/games/details/${game._id}`}>
                                {game.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <Link to="/games/create">
                <button>Create game</button>
            </Link>
        </div>
    );
}

export default HomePage;
