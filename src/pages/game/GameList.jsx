import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gameService from "../../services/game.service";
import categoryService from "../../services/category.service";

function GameList() {
    const [games, setGames] = useState([]);
    const [fullGameList, setFullGameList] = useState([]);


    const [fullCategoriesList, setFullCategoriesList] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [errorMessage, setErrorMessage] = useState(undefined);

    useEffect(() => {
        gameService
            .getGamesListWithCategories()
            .then((response) => {
                setGames(response.data);
                setFullGameList(response.data);
            })
            .catch((error) => {
                console.log("API: Error while getting the list of games")
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })

        categoryService
            .getCategoriesList()
            .then((response) => {
                setFullCategoriesList(response.data)
            })
            .catch((error) => {
                console.log("API: Error while getting the list of categories")
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })

    }, []);

    const handleSearch = (e) => {
        const filteredArray = fullGameList.filter((elm) => {
            return elm.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        if (e.target.value === "") {
            setGames(fullGameList)
        } else {
            setGames(filteredArray);
        }
    };

    const checkArray2IncludesArray1 = (array1, array2) => {
        return array1.filter((item) => array2.includes(item));
    }

    const handleFilter = (event) => {
        const { value, checked } = event.target

        if (checked) {
            setSelectedCategories((prevSelectedCategories) => [...prevSelectedCategories, value]);
        } else {
            setSelectedCategories((prevSelectedCategories) =>
                prevSelectedCategories.filter((category) => category !== value)
            );
        };
    }

    useEffect(() => {
        if (fullGameList.length > 0) {
            const filteredArray = fullGameList.filter((game) => {
                let gameCategoriesIds = game.categories.map((category) => category._id)
                let compareResult = checkArray2IncludesArray1(gameCategoriesIds, selectedCategories)
                if (compareResult.length > 0) return true;
                else return false;
            });
            if (selectedCategories.length == 0) {
                setGames(fullGameList)
            } else {
                setGames(filteredArray);
            }
        }
    }, [selectedCategories])

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
                    onChange={handleSearch}
                    placeholder="Search"
                />
            </form>


            <div className="uk-flex uk-width-expand">
                <div className="uk-width-medium">
                    <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                        <ul className="uk-list">
                            {fullCategoriesList && fullCategoriesList.map((category) => {
                                return (
                                    <li key={category._id}>
                                        <input
                                            className=" category-filter-checkbox"
                                            type="checkbox"
                                            value={category._id}
                                            checked={selectedCategories.includes(category._id)}
                                            onChange={handleFilter}
                                        />
                                        <span className="category-filter-name">
                                            {category.name}
                                        </span>

                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <div className="uk-width-expand">
                    <div className="uk-grid uk-child-width-1-4@m" uk-grid="masonry: pack">
                        {games && games.map((game) => {
                            return (
                                <Link to={`/games/details/${game._id}`} key={game._id}>
                                    <div className="uk-card uk-card-default category-card">
                                        <div classclassName="uk-card-media-top">
                                            {game.imageURL && <img src={`${game.imageURL}`} width="1800" height="1200" alt="" className="game-card-image" />}
                                        </div>
                                        <div className="uk-card-body">
                                            <h3 className="uk-card-title">{game.name}</h3>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>


        </div>
    );
}

export default GameList;
