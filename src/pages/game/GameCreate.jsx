import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gameService from "../../services/game.service";
import categoryService from "../../services/category.service";
import Select from 'react-select';

function GameCreate(props) {
    const [gameName, setGameName] = useState('');
    const [gameInformations, setGameInformations] = useState('');
    const [gameImageURL, setGameImageURL] = useState('');
    const [categoriesOptions, setCategoriesOptions] = useState([])

    // let categoriesOptions = []

    let options = [
        { value: 1, label: "Blue" },
        { value: 2, label: "Green" },
        { value: 3, label: "Orange" },
        { value: 4, label: "Purple" },
    ];

    const [selectedCategories, setSelectedCategories] = useState([])

    const [errorMessage, setErrorMessage] = useState(undefined)

    const navigate = useNavigate();

    const handleGameName = (e) => setGameName(e.target.value);
    const handleGameInformations = (e) => setGameInformations(e.target.value);
    const handleGameImageURL = (e) => setGameImageURL(e.target.value);

    function parseCategoriesToOptions(categoriesArray) {
        let tempCategoriesArray = []
        categoriesArray.forEach((category) => {
            const categoryName = category.name;
            const categoryId = category._id;
            const option = { label: categoryName, value: categoryId };

            tempCategoriesArray.push(option)
        })
        setCategoriesOptions(tempCategoriesArray)
    }

    useEffect(() => {
        categoryService
            .getCategoriesList()
            .then((response) => {
                parseCategoriesToOptions(response.data);
            })
            .catch((error) => {
                console.log("API: Error while getting the list of categories")
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestBody = {
            name: gameName,
            informations: gameInformations,
            imageURL: gameImageURL
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
        <div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <h3>Create new game</h3>

                <label htmlFor="game-name-input">Name</label>
                <input type="text" id="game-name-input" value={gameName} onChange={handleGameName} />
                <br />
                <label htmlFor="game-informations-input">Information</label>
                <input type="text" id="game-informations-input" value={gameInformations} onChange={handleGameInformations} />
                <br />
                <label htmlFor="game-image-url-input">Image URL</label>
                <input type="text" id="game-image-url-input" value={gameImageURL} onChange={handleGameImageURL} />
                <br />

                <h1>Select component</h1>

                {categoriesOptions.length > 0 ?
                    < Select
                        className="game-categories-select"
                        options={categoriesOptions}
                        value={selectedCategories}
                        onChange={handleCategoriesSelect}
                        isMulti
                    />
                    : ""
                }

                <button type="submit">Create game</button>
            </form>

        </div>
    )
}

export default GameCreate;