import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import gameService from "../../services/game.service";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Comment from "../../components/Comment";

function GameDetails(props) {
    const [game, setGame] = useState()

    const [errorMessage, setErrorMessage] = useState(undefined)

    const { gameId } = useParams();

    useEffect(() => {
        gameService
            .getGame(gameId)
            .then((response) => {
                setGame(response.data[0]);
            })
            .catch((error) => {
                console.log("API: Error while getting the details of a game")
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }, []);

    const [comment,setComment] = useState("");
    const { user } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newComment = {
            "comment" : comment,
            "author" : user._id
        }

        gameService
            .createComment(gameId,{newComment})
                .then(() => {
                    gameService
                    .getGame(gameId)
                    .then((response) => {
                        setGame(response.data[0]);
                        setComment("");
                    })
                    .catch((error) => {
                        console.log("API: Error while getting the details of a game")
                        const errorDescription = error.response.data.message;
                        setErrorMessage(errorDescription);
                    })
                })
                .catch(err => console.log(err))

      }  

    return (
        <div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <h1>Game Details</h1>
            <ul>
                {game &&
                    <>
                        <li>Name: {game.name}</li>
                        <li>Information: {game.informations}</li>
                        <li>Image URL: {game.imageURL}</li>
                        <h2>Comments</h2>
                        {user ? 
                            <form onSubmit={handleSubmit}>
                                <input type ="text" name="comment" value = {comment} onChange={(e) => { setComment(e.target.value) }} size="100"></input>
                                <button type="submit">Add</button>
                            </form> 
                            :
                            <Link to={"/login"}>Log in to comment !</Link>
                        }
                        {game.comments.length > 0 ? 
                        <>
                            {game.comments.map(comment => {
                                return (
                                    <Comment key={comment._id} user={user} comment={comment} gameId = {gameId} callbackToSetGame={setGame}/>
                                );
                            })}
                        </> :
                        <>
                            <p>No related comments...</p>
                        </>
                        }
                    </>
                }
            </ul>
            {game &&
                <Link to={`/games/edit/${game._id}`}>
                    <button>Edit game</button>
                </Link>
            }
        </div>
    )
}

export default GameDetails;