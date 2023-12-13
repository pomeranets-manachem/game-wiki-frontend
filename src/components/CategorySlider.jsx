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
            <div className="uk-position-relative uk-visible-toggle uk-light uk-text-center category-slider" tabIndex="-1" uk-slider="true">
                <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@m uk-grid">

                    {categories && categories.map((category) => {
                        return (

                            <li key={category._id} >
                                <Link to={`/categories/details/${category._id}`}>
                                    <div className="uk-card uk-card-default uk-card-body category-card">
                                        <h3 className="uk-card-title">
                                            {category.name}
                                        </h3>

                                        <p>{category.description.substring(0, 20) + "..."}</p>


                                    </div>
                                </Link>
                            </li>


                        )
                    })}
                </ul>

                <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="true" uk-slidenav-previous="true" uk-slider-item="previous"></a>
                <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="true" uk-slidenav-next="true" uk-slider-item="next"></a>

            </div>

        </div >
    )
}

export default CategorySlider;