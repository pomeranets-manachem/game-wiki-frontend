import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gameService from "../services/game.service";

function CategorySlider(props) {

    const [games, setGames] = useState([]);

    useEffect(() => {
        gameService
            .getGamesList()
            .then((response) => {
                setGames(response.data.slice(0, 7));
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                console.log("API: Error while getting the list of games ", errorDescription)
            })
    }, []);

    return (
        <div>
            <div className="uk-position-relative uk-visible-toggle uk-light uk-text-center category-slider" tabIndex="-1" uk-slider="true">
                <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@m uk-grid">

                    {games && games.map((game) => {
                        return (

                            <li key={game._id} >
                                <Link to={`/games/details/${game._id}`}>
                                    <div className="uk-card uk-card-default uk-card-body category-card">
                                        <h3 className="uk-card-title">
                                            {game.name}
                                        </h3>
                                    </div>
                                </Link>
                            </li>


                        )
                    })}





                </ul>

                <a className="uk-position-center-left uk-position-small" href="true" uk-slidenav-previous="true" uk-slider-item="previous"></a>
                <a className="uk-position-center-right uk-position-small" href="true" uk-slidenav-next="true" uk-slider-item="next"></a>
                <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
            </div>

        </div >
    )
}

export default CategorySlider;