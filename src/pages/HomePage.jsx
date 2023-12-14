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
                <div className="page-info">
                    <p>Welcome to our game wiki! Here you'll find a treasure trove of information and community-driven commentary about various games across different categories.</p>

                    <p>Our wiki is a comprehensive resource where gamers like you can explore and contribute their thoughts and insights about a wide range of games. Whether you're interested in action, adventure, strategy, RPGs, puzzle games, or any other genre, we have you covered.</p>

                    <p>Navigate through our user-friendly interface to discover detailed profiles of popular games, each filled with useful information. Dive into the expansive world of gaming as you explore the diverse categories we have to offer.</p>

                    <p>What sets us apart is our active community of passionate gamers who love to engage in thoughtful discussions and share their thoughts through comments. Get involved in the conversation, join discussions on game strategies, storylines, character development, and more. Your voice matters!</p>

                    <p>Whether you are a die-hard fan or just starting your journey into the gaming realm, our wiki is the perfect place to expand your knowledge, connect with fellow gamers, and uncover hidden gems. Together, let's build a vibrant hub of gaming wisdom and camaraderie.</p>

                    <p>Start exploring now, join the discussions, and let the games begin!</p>
                </div>

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
            </div>
        </div>
    );
}

export default HomePage;
