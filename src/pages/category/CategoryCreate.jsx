import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import categoryService from "../../services/category.service";

function CategoryCreate(props) {
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

    const [errorMessage, setErrorMessage] = useState(undefined)

    const navigate = useNavigate();

    const handleCategoryName = (e) => setCategoryName(e.target.value);
    const handleCategoryDescription = (e) => setCategoryDescription(e.target.value);


    const handleSubmit = (event) => {
        event.preventDefault();

        const requestBody = {
            name: categoryName,
            description: categoryDescription,
        }

        categoryService
            .createCategory(requestBody)
            .then((response) => {
                const newCategory = response.data;
                navigate(`/categories/details/${newCategory._id}`);
            })
            .catch((error) => {
                console.log(error);
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    return (
        <div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <h3>Create new category</h3>

                <label htmlFor="category-name-input">Name</label>
                <input type="text" id="category-name-input" value={categoryName} onChange={handleCategoryName} />
                <br />
                <label htmlFor="category-informations-input">Information</label>
                <input type="text" id="category-informations-input" value={categoryDescription} onChange={handleCategoryDescription} />
                <br />
                <br />

                <button type="submit">Create category</button>
            </form>

        </div>
    )
}

export default CategoryCreate;