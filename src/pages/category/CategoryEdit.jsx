import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import categoryService from "../../services/category.service";

function CategoryEdit(props) {
    const [category, setCategory] = useState()
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { categoryId } = useParams();

    const handleCategoryName = (e) => setCategoryName(e.target.value);
    const handleCategoryDescription = (e) => setCategoryDescription(e.target.value);

    useEffect(() => {
        categoryService
            .getCategory(categoryId)
            .then((response) => {
                const uneditedCategory = response.data[0];
                setCategory(uneditedCategory);
                setCategoryName(uneditedCategory.name);
                setCategoryDescription(uneditedCategory.description);
            })
            .catch((error) => {
                console.log("API: Error while getting the details of a category")
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestBody = {
            name: categoryName,
            description: categoryDescription,
        }

        categoryService
            .editCategory(categoryId, requestBody)
            .then((response) => {
                const editedCategory = response.data;
                navigate(`/categories/details/${editedCategory._id}`);
            })
            .catch((error) => {
                console.log("API: error while editing a category", error);
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    const handleDelete = (event) => {
        categoryService
            .deleteCategory(categoryId)
            .then((response) => {
                navigate('/')
            })
            .catch((error) => {
                console.log("API: error while deleting a category", error);
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    };

    return (
        <div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
                <h3>Edit category</h3>

                <label htmlFor="category-name-input">Name</label>
                <input type="text" id="category-name-input" value={categoryName} onChange={handleCategoryName} />
                <br />
                <label htmlFor="category-informations-input">Description</label>
                <input type="text" id="category-informations-input" value={categoryDescription} onChange={handleCategoryDescription} />
                <br />

                <button type="submit">Save</button>
            </form>

            <br />
            <button onClick={handleDelete}>DELETE</button>
        </div>
    )
}

export default CategoryEdit;