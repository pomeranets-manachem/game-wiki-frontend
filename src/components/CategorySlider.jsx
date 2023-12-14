import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import categoryService from "../services/category.service";

function CategorySlider(props) {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        categoryService
            .getCategoriesList()
            .then((response) => {
                setCategories(response.data.slice(0, 10));
            })
            .catch((error) => {
                console.log("API: Error while getting the list of games")
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }, []);

    return (
        <div>
            <div uk-slider="true">
                <div className="uk-position-relative">
                    <div className="uk-slider-container uk-light" tabIndex="-1">
                        <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@m uk-grid">
                            {categories && categories.map((category) => {
                                return (
                                    <li key={category._id} className="link-with-no-decoration">
                                        <Link to={`/categories/details/${category._id}`}>
                                            <div className="uk-card uk-card-default uk-card-hover uk-card-body category-card category-card-container">
                                                <h3 className="uk-card-title">
                                                    {category.name}
                                                </h3>
                                                <p className="category-card-description">{category.description.substring(0, 20) + "..."}</p>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>

                        <a className="uk-position-center-left-out uk-position-small left-arrow" href="true" uk-slidenav-previous="true" uk-slider-item="previous"></a>
                        <a className="uk-position-center-right-out uk-position-small right-arrow" href="true" uk-slidenav-next="true" uk-slider-item="next"></a>

                        <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CategorySlider;