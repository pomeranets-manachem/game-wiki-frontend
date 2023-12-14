import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import gameService from "../../services/game.service";
import CategorySelect from "../../components/CategorySelect";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function GameEdit(props) {
    const [game, setGame] = useState()
    const [gameName, setGameName] = useState('');
    const [gameInformations, setGameInformations] = useState('');
    const [gameImageURL, setGameImageURL] = useState('');

    const [selectedCategories, setSelectedCategories] = useState([])
    const [previousCategories, setPreviousCategories] = useState([])

    const [errorMessage, setErrorMessage] = useState(undefined);

    const { gameId } = useParams();

    const navigate = useNavigate();

    const handleGameName = (e) => setGameName(e.target.value);
    const handleGameInformations = (e) => setGameInformations(e.target.value);
    const handleGameImageURL = (e) => setGameImageURL(e.target.value);

    function parseCategoriesToSelectedCategories(categoriesArray) {
        let tempCategoriesArray = []
        categoriesArray.forEach((category) => {
            const categoryName = category.name;
            const categoryId = category._id;
            const option = { label: categoryName, value: categoryId };

            tempCategoriesArray.push(option)
        })
        setSelectedCategories(tempCategoriesArray)
    }

    useEffect(() => {
        gameService
            .getGameAndCategories(gameId)
            .then((response) => {
                const { game, categories } = response.data;
                let oldCategories = categories.map((category) => { return category._id });
                setPreviousCategories(oldCategories)
                setGame(game);
                setGameName(game.name);
                setGameInformations(game.informations);
                setGameImageURL(game.imageURL);
                parseCategoriesToSelectedCategories(categories)
            })
            .catch((error) => {
                console.log("API: Error while getting the details of a game")
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }, []);

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
            previousCategories: previousCategories,
            updatedCategories: selectedIds
        }

        gameService
            .editGame(gameId, requestBody)
            .then((response) => {
                const editedGame = response.data;
                navigate(`/games/details/${editedGame._id}`);
            })
            .catch((error) => {
                console.log("API: error while editing a game", error);
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    const handleDelete = (event) => {
        gameService
            .deleteGame(gameId)
            .then((response) => {
                navigate('/')
            })
            .catch((error) => {
                console.log("API: error while deleting a game", error);
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    };

    const handleCategoriesSelect = (selectedValues) => {
        setSelectedCategories(selectedValues);
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setGameInformations(data);
    };

    return (
        <div className="uk-container">
            <div className="uk-grid-large">
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <h3>Edit game</h3>
                    <div className="uk-margin">
                        <label htmlFor="game-name-input">Name</label>
                        <input className="uk-input" type="text" id="game-name-input" value={gameName} onChange={handleGameName} />
                    </div>
                    <div className="">
                        <div className="ckeditor">
                            <CKEditor
                                editor={ClassicEditor}
                                data={gameInformations}
                                onChange={handleEditorChange}
                            />
                        </div>
                    </div>
                    <div className="uk-margin">
                        <label htmlFor="game-image-url-input">Image URL</label>
                        <input className="uk-input" type="text" id="game-image-url-input" value={gameImageURL} onChange={handleGameImageURL} />
                    </div>
                    <div className="uk-margin">
                        <h3>Select categories</h3>
                        <CategorySelect value={selectedCategories} onChange={handleCategoriesSelect} />
                        <button type="submit" className="uk-margin uk-button uk-button-primary uk-align-right">Save</button>
                        <button onClick={() => { navigate(-1) }} className="uk-margin uk-button uk-button-secondary">Cancel</button>
                    </div>
                    <button onClick={handleDelete} className="uk-button uk-button-danger uk-align-left">DELETE</button>
                </form>

            </div>
        </div>
    )
}

export default GameEdit;