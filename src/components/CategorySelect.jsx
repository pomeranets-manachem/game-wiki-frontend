import Select from 'react-select';
import categoryService from "../services/category.service";
import { useState, useEffect } from "react";


function CategorySelect(props) {
    const [categoriesOptions, setCategoriesOptions] = useState([])

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

    return (
        <div>
            {categoriesOptions.length > 0 ?
                < Select
                    className="game-categories-select"
                    options={categoriesOptions}
                    value={props.selectedCategories}
                    onChange={props.onChange}
                    isMulti
                />
                : ""
            }
        </div>
    )
}

export default CategorySelect;