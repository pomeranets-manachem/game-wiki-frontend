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
                console.log("API: Error while getting the list of categories")
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }, []);

    return (
        <div className="uk-container">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <h1>Categories</h1>
            <Link to="/categories/create">
                <button className="uk-button uk-button-primary">Create category</button>
            </Link>

            <div className="uk-grid uk-child-width-1-4@m">
                {categories && categories.map((category) => {
                    return (
                        <div>
                            <Link to={`/categories/details/${category._id}`}>
                                <div key={category._id} className="uk-margin-medium-top uk-card uk-card-hover uk-card-small uk-card-secondary category-card">
                                    <div className="uk-card-header">
                                        <h3 class="uk-card-title">{category.name}</h3>
                                    </div>
                                    <div className="uk-card-body">
                                        {category.description}
                                    </div>

                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>

        </div >
    );
}

export default CategoryList;
