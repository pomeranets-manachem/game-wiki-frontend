import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import gameService from "../services/game.service";

function CategorySlider(props) {
  const [games, setGames] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    gameService
      .getGamesList()
      .then((response) => {
        setGames(response.data.slice(0, 7));
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        console.log(
          "API: Error while getting the list of games ",
          errorDescription
        );
      });
  }, []);

  const randomGameClick = (event) => {
    const randomGame = games[Math.floor(Math.random() * games.length)];
    if (randomGame) navigate(`/games/details/${randomGame._id}`);
  };

  return (
    <div className="homepage-game-slider">
      <div uk-slider="true">
        <div className="uk-position-relative">
          <div
            className="uk-slider-container uk-light"
            tabIndex="-1"
            uk-slider="true"
          >
            <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@m uk-grid">
              {games &&
                games.map((game) => {
                  return (
                    <li key={game._id} className="link-with-no-decoration">
                        <Link to={`/games/details/${game._id}`}>
                          <div className="gameSlider-card" style={{backgroundImage:`url(${game.imageURL})`, backgroundSize : "cover"}}>
                          </div>
                          <div><h3 className="gameSlider-card-name">{game.name}</h3></div>
                        </Link>
                    </li>
                  );
                })}
            </ul>

            <a
              className="uk-position-center-left-out uk-position-small left-arrow"
              href="true"
              uk-slidenav-previous="true"
              uk-slider-item="previous"
            ></a>
            <a
              className="uk-position-center-right-out uk-position-small right-arrow"
              href="true"
              uk-slidenav-next="true"
              uk-slider-item="next"
            ></a>

            <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
          </div>
        </div>
      </div>
      <div className="dice-container">
        <i
          className="fa-solid fa-dice fa-2xl dice"
          onClick={randomGameClick}
        ></i>
      </div>
    </div>
  );
}

export default CategorySlider;
