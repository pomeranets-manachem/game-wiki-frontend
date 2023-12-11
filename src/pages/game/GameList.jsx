import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gameService from "../../services/game.service";

function GameList() {
    const [games, setGames] = useState([]);
    const [errorMessage, setErrorMessage] = useState(undefined);

    useEffect(() => {
        gameService
            .getGamesList()
            .then((response) => {
                setGames(response.data);
                setFullGameList(response.data)
            })
            .catch((error) => {
                console.log("API: Error while getting the list of games")
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }, []);

    const [fullGameList, setFullGameList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
        const filteredArray = fullGameList.filter((elm) => {
            return elm.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        if (e.target.value === "") {
            setGames(fullGameList)
        } else {
            setGames(filteredArray);
        }
    };

    return (
        <div className="uk-container">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <h1>Games</h1>
            <div className="uk-align-right">
                <Link to="/games/create">
                    <button className="uk-button uk-button-primary">Create game</button>
                </Link>
            </div>
            <form className="uk-search uk-search-default">
                <span uk-search-icon="true"></span>
                <input
                    className="uk-search-input"
                    type="text"
                    name="searchQuery"
                    value={searchQuery}
                    onChange={handleChange}
                    placeholder="Search"
                />
            </form>

            <div className="uk-grid uk-child-width-1-4@m ">
                {games && games.map((game) => {
                    return (
                        <Link to={`/games/details/${game._id}`}>
                            <div key={game._id} className="uk-margin-medium-top uk-card uk-card-hover uk-card-default uk-card-secondary category-card">
                                <div className="uk-card-body">
                                    {game.name}
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

        </div>
    );
}

export default GameList;
