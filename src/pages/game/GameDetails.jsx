import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import gameService from "../../services/game.service";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Comment from "../../components/Comment";

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
        <div className="uk-container">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <h1>Game Details</h1>
            <ul className="uk-list">
                {game &&
                    <>
                        <li>Name: {game.name}</li>
                        <li>Image URL: {game.imageURL}</li>
                        <li>Game Information
                            <div>
                                <textarea className="uk-textarea" id="game-info-textarea" rows="10" value={game.informations} readOnly={true}></textarea>
                            </div>
                        </li>

                        <li> Categories
                            <div className="uk-flex uk-flex-wrap">
                                {categories && categories.map((category) => {
                                    return (
                                        <div key={category._id} className="category-small-display uk-border-pill uk-margin-top">
                                            {category.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </li>

                        <div className="uk-margin">
                            <Link to={`/games/edit/${game._id}`}>
                                <button className="uk-margin uk-button uk-button-primary">Edit game</button>
                            </Link>
                        </div>

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
                                                <Comment key={comment._id} user={user} comment={comment} gameId={gameId} callbackToSetGame={setGame} />
                                            );
                                        })}
                                    </> :
                                    <>
                                        <p>No related comments...</p>
                                    </>
                                }
                            </div>
                        </section>
                    </>
                }
            </ul>
        </div>
    )
}

export default GameDetails;