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
        <div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <h1>Games list</h1>
            <input
                type="text"
                name="searchQuery"
                value={searchQuery}
                onChange={handleChange}
                placeholder="Search"
              />
            <ul>
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

export default GameList;
