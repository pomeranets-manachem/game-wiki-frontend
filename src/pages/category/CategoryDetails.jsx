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
        <div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <h1>Category Details</h1>
            <ul>
                {category &&
                    <>
                        <li>Name: {category.name}</li>
                        <li>Description: {category.description}</li>
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
            </ul>
            {category &&
                <Link to={`/categories/edit/${category._id}`}>
                    <button>Edit category</button>
                </Link>
            }
        </div>
    )
}

export default CategoryDetails;