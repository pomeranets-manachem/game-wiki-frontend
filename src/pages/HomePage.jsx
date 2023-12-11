import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gameService from "../services/game.service";
import CategorySlider from "../components/CategorySlider";
import GameSlider from "../components/GameSlider"

function HomePage() {


    return (
        <div className="uk-container homepage">
            <div className="">
                <h1>Games Wiki</h1>
                <div className="homepage-categories">
                    <div className="uk-grid uk-flex-between uk-flex-bottom">
                        <h2 id="homepage-categories-heading">
                            Categories
                        </h2>

                        <Link to="/categories/">
                            Show more...
                        </Link>
                    </div>
                    <CategorySlider></CategorySlider>
                </div>

                <div className="homepage-games">
                    <div className="uk-grid uk-flex-between uk-flex-bottom">
                        <h2 id="homepage-games-heading">Games</h2>
                        <Link to="/games/">
                            Show more...
                        </Link>
                    </div>
                    <GameSlider></GameSlider>
                </div>

                <div className="uk-text-right">
                    <Link to="/games/create">
                        <button className="uk-button-icon" uk-icon="icon: plus-circle; ratio: 3"></button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
