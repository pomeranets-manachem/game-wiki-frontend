import { useEffect, useState } from "react";
import gameService from "../services/game.service";

function Comment(props) {
  const [isEditCommentMode, setIsEditCommentMode] = useState(false);
  const [editedComment, setEditedComment] = useState(props.comment.comment);
  const [commentUpdatedAt, setCommentUpdatedAt] = useState(props.comment.updatedAt)

  useEffect(() => {
    const date = new Date(commentUpdatedAt);
    const shortFormat = date.toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' });
    setCommentUpdatedAt(shortFormat)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedComment = editedComment;

    gameService
      .editComment(props.gameId, props.comment._id, { updatedComment })
      .then(() => {
        gameService
          .getGame(props.gameId)
          .then((response) => {
            setIsEditCommentMode(false);
            props.callbackToSetGame(response.data[0]);
          })
          .catch((error) => {
            console.log("API: Error while getting the details of a game");
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          });
      })
      .catch((err) => console.log(err));
  };

  const deleteComment = () => {
    gameService
      .deleteComment(props.gameId, props.comment._id)
      .then(() => {
        gameService
          .getGame(props.gameId)
          .then((response) => {
            setIsEditCommentMode(false);
            props.callbackToSetGame(response.data[0]);
          })
          .catch((error) => {
            console.log("API: Error while getting the details of a game");
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          });
      })
      .catch((err) => console.log(err));
  }

  return !isEditCommentMode ? (
    <article className="uk-comment uk-comment-primary">
      <header className="uk-comment-header">
        <div className="">
          <div className="uk-width-auto">
            {/* <img class="uk-comment-avatar" src="images/avatar.jpg" width="80" height="80" alt=""> */}
          </div>
          <h4 className="uk-comment-title uk-margin-remove uk-align-left">
            @{props.comment.author.username}
          </h4>
          <div className="uk-comment-meta uk-align-right">
            {commentUpdatedAt}
          </div>
        </div>
      </header>
      <div className="uk-comment-body">
        <p>{props.comment.comment}</p>
      </div>
      {props.user && props.user.username === props.comment.author.username ? (
        <div className="uk-align-right">
          <button className="comment-button uk-button uk-button-default uk-button-small" onClick={() => setIsEditCommentMode(true)}>Edit</button>
          <button className="comment-button uk-button uk-button-danger uk-button-small" onClick={() => deleteComment()}><span className="uk-justify-center" uk-icon="trash"></span></button>
        </div>
      ) : ""
      }
    </article>
  ) : (
    <>
      <div className="comment-box" key={props.comment._id}>
        <div>{props.comment.author.username}</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="editedComment"
            value={editedComment}
            onChange={(e) => {
              setEditedComment(e.target.value);
            }}
            size="100"
          ></input>
          <button type="submit">Save</button>
        </form>
        <div>{props.comment.createdAt}</div>
      </div>
    </>
  );
}

export default Comment;
