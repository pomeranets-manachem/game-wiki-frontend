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
                setFullCategoryList(response.data)
            })
            .catch((error) => {
                console.log("API: Error while getting the list of categories")
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }, []);

    const [fullCategoryList, setFullCategoryList] = useState([]);

    const handleChange = (e) => {
        const filteredArray = fullCategoryList.filter((elm) => {
            return elm.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        if (e.target.value === "") {
            setCategories(fullCategoryList)
        } else {
            setCategories(filteredArray);
        }
    };

    return (
        <div className="uk-container">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <h1>Categories</h1>
            <div className="uk-align-right">
                <Link to="/categories/create">
                    <button className="uk-button uk-button-primary">Create category</button>
                </Link>
            </div>

            <form className="uk-search uk-search-default">
                <span uk-search-icon="true"></span>
                <input
                    className="uk-search-input"
                    type="text"
                    name="searchQuery"
                    onChange={handleChange}
                    placeholder="Search"
                />
            </form>

            <div className="categoryList-categories-container">
                {categories && categories.map((category) => {
                    return (
                        <div className="categoryList-categories-card link-with-no-decoration" key={category._id}>
                            <Link to={`/categories/details/${category._id}`}>
                                <div className="uk-margin-medium-top uk-card uk-card-hover uk-card-small uk-card-secondary category-card category-card-container">
                                    <div className="uk-card-header">
                                        {category.name.length > 18 ?
                                            (<h3 className="uk-card-title">{category.name.substring(0, 18) + "..."}</h3>) : (<h3 className="uk-card-title">{category.name}</h3>)
                                        }

                                    </div>
                                    <div className="uk-card-body">
                                        {category.description.substring(0, 20) + "..."}
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
