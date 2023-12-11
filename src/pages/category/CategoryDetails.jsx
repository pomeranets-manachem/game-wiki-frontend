import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import categoryService from "../../services/category.service";

function CategoryDetails(props) {
    const [category, setCategory] = useState()

    const [errorMessage, setErrorMessage] = useState(undefined)

    const { categoryId } = useParams();

    useEffect(() => {
        categoryService
            .getCategory(categoryId)
            .then((response) => {
                setCategory(response.data);
            })
            .catch((error) => {
                console.log("API: Error while getting the details of a category")
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }, []);

    return (
        <div className="uk-container">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {category &&
                <>
                    <h1>{category.name} Details</h1>
                    <p>{category.description}</p>

                    <Link to={`/categories/edit/${category._id}`}>
                        <button className="uk-button uk-button-primary">Edit category</button>
                    </Link>
                    <h2>Games in this category:</h2>
                    <ul>
                        {category.games && category.games.map((game) => {
                            return (
                                <li key={game._id}>{game.name}</li>
                            )
                        })}
                    </ul>
                </>
            }
        </div >
    )
}

export default CategoryDetails;