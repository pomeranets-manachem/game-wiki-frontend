import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import categoryService from "../../services/category.service";

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState(undefined);

    useEffect(() => {
        categoryService
            .getCategoriesList()
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log("API: Error while getting the list of games")
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }, []);

    return (
        <div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <h1>Categories list</h1>
            <ul>
                {categories && categories.map((category) => {
                    return (
                        <li key={category._id}>
                            <Link to={`/categories/details/${category._id}`}>
                                {category.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <Link to="/categories/create">
                <button>Create category</button>
            </Link>
        </div>
    );
}

export default CategoryList;
