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
        <div className="uk-container uk-text-center homepage">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <h1>Games Wiki</h1>

            <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex="-1" uk-slider="true">
                <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@m uk-grid">
                    <li>
                        <div className="uk-card uk-card-default uk-card-body category-card">
                            <h3 className="uk-card-title">Default</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </li>
                    <li>
                        <div className="uk-card uk-card-default uk-card-body category-card">
                            <h3 className="uk-card-title">Default</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </li>
                    <li>
                        <div className="uk-card uk-card-default uk-card-body category-card">
                            <h3 className="uk-card-title">Default</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </li>
                    <li>
                        <div className="uk-card uk-card-default uk-card-body category-card">
                            <h3 className="uk-card-title">Default</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </li>
                </ul>

                <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="true" uk-slidenav-previous="true" uk-slider-item="previous"></a>
                <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="true" uk-slidenav-next="true" uk-slider-item="next"></a>

            </div>



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
