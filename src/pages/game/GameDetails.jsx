import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import gameService from "../../services/game.service";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Comment from "../../components/Comment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function GameDetails(props) {
    const [game, setGame] = useState()
    const [categories, setCategories] = useState([])
    const [comments, setComments] = useState(null);
    const [errorMessage, setErrorMessage] = useState(undefined)

    const { gameId } = useParams();

    useEffect(() => {
        gameService
            .getGameAndCategories(gameId)
            .then((response) => {
                setGame(response.data.game);
                setCategories(response.data.categories)
                setSorteredCommentsbyNewest(response.data.game.comments)
            })
            .catch((error) => {
                console.log("API: Error while getting the details of a game")
                // const errorDescription = error.response.data.message;
                // setErrorMessage(errorDescription);
            })
    }, []);

    const setSorteredCommentsbyNewest = (arr) => {
        let sorteredCommentsArr = arr.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setComments(sorteredCommentsArr);
    }

    const [comment, setComment] = useState("");
    const { user } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newComment = {
            "comment": comment,
            "author": user._id
        }

        gameService
            .createComment(gameId, { newComment })
            .then(() => {
                gameService
                    .getGame(gameId)
                    .then((response) => {
                        setComment("");
                        setSorteredCommentsbyNewest(response.data.comments)
                    })
                    .catch((error) => {
                        console.log("API: Error while getting the details of a game");
                        const errorDescription = error.response.data.message;
                        setErrorMessage(errorDescription);
                    });
            })
            .catch((err) => console.log(err));

    }

    return (
        <div className="gameDetails uk-container">

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="gameDetailsPage-header">
                <div><h1>{game && game.name}</h1></div>
                <div>{game && (<Link to={`/games/edit/${game._id}`}>
                    <button className="uk-margin uk-button uk-button-primary">Edit game</button>
                </Link>)}</div>

            </div>
            <br />

            <div className="gameDetailsPage-body">

                <div className="gameDetailsPage-general-infos">

                    <div className="gameDetailsPage-general-infos-image">
                        {game && game.imageURL ? <img src={game.imageURL} alt="" /> : <div className="gameDetailsPage-general-infos-no-image"></div>}
                    </div>
                    <div className="uk-flex uk-flex-wrap">
                        {categories && categories.map((category) => {
                            return (
                                <Link to={`/categories/details/${category._id}`} key={category._id}>
                                    <div className="category-small-display uk-border-pill uk-margin-top">
                                        {category.name}
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                <div className="gameDetailsPage-game-infos">

                    <div className="ckeditor">
                        {game && (<CKEditor
                            editor={ClassicEditor}
                            data={game.informations}
                            config={{
                                toolbar: []
                            }}
                            disabled
                        />)}
                    </div>
                </div>

            </div>

            <div className="gameDetails-comments">
                <h2>Comments</h2>

                <section className="comment-section">
                    {user ?
                        <form onSubmit={handleSubmit}>
                            <input className="uk-input" type="text" name="comment" value={comment} onChange={(e) => { setComment(e.target.value) }} size="100"></input>
                            <button className="uk-align-right uk-button uk-button-default uk-button-small" type="submit">Add</button>
                        </form>
                        :
                        <Link to={"/login"}>Log in to comment !</Link>
                    }
                    <div className="display-comments">
                        {comments && comments.length > 0 ?
                            <>
                                {comments.map(comment => {
                                    return (
                                        <Comment key={comment._id} user={user} comment={comment} gameId={gameId} callbackToSetSorteredCommentsbyNewest={setSorteredCommentsbyNewest} />
                                    );
                                })}
                            </> :
                            <>
                                <p>No related comments...</p>
                            </>
                        }
                    </div>
                </section>
            </div>

        </div>
    )
}

export default GameDetails;