import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gameService from "../../services/game.service";
import CategorySelect from "../../components/CategorySelect";

function GameCreate(props) {
    const [gameName, setGameName] = useState('');
    const [gameInformations, setGameInformations] = useState('');
    const [gameImageURL, setGameImageURL] = useState('');

    const [selectedCategories, setSelectedCategories] = useState([])


    const [errorMessage, setErrorMessage] = useState(undefined)

    const navigate = useNavigate();

    const handleGameName = (e) => setGameName(e.target.value);
    const handleGameInformations = (e) => setGameInformations(e.target.value);
    const handleGameImageURL = (e) => setGameImageURL(e.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        let selectedIds = selectedCategories.map((category) => {
            return (
                category.value
            )
        })

        const requestBody = {
            name: gameName,
            informations: gameInformations,
            imageURL: gameImageURL,
            categories: selectedIds
        }

        gameService
            .createGame(requestBody)
            .then((response) => {
                const newGame = response.data;
                navigate(`/games/details/${newGame._id}`);
            })
            .catch((error) => {
                console.log(error);
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    const handleCategoriesSelect = (selectedValues) => {
        setSelectedCategories(selectedValues);
    };

    return (
        <div className="uk-container">
            <div className="uk-width-large">
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <h3>Create new game</h3>
                    <div className="uk-margin">
                        <label htmlFor="game-name-input">Name</label>
                        <input className="uk-input" type="text" id="game-name-input" value={gameName} onChange={handleGameName} />
                    </div>
                    <div className="uk-margin">
                        <label htmlFor="game-informations-input">Information</label>
                        <textarea className="uk-textarea" id="game-informations-input" rows="5" value={gameInformations} onChange={handleGameInformations} ></textarea>
                    </div>
                    <div className="uk-margin">
                        <label htmlFor="game-image-url-input">Image URL</label>
                        <input className="uk-input" type="text" id="game-image-url-input" value={gameImageURL} onChange={handleGameImageURL} />
                    </div>

                    <h3>Select categories</h3>
                    <CategorySelect value={selectedCategories} onChange={handleCategoriesSelect} />
                    <button type="submit" className="uk-margin uk-button uk-button-primary">Create game</button>
                </form>
            </div>
        </div>
    )
}

export default GameCreate;