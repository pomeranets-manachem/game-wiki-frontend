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
            props.callbackToSetSorteredCommentsbyNewest(response.data.comments);
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
            props.callbackToSetSorteredCommentsbyNewest(response.data.comments);
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
        <div className="comment-avatar uk-align-left">
          <h4 className="uk-comment-title uk-margin-remove ">
            @{props.comment.author.username}
          </h4>
        </div>
        <div className="uk-align-right">
          <div className="uk-comment-meta">
            {commentUpdatedAt}
          </div>
        </div>
      </header>
      <div className="uk-comment-body">
        <p>{props.comment.comment}</p>
      </div>
      {props.user && props.user.username === props.comment.author.username ? (
        <div className="uk-align-right">
          <button className="comment-button uk-button uk-button-default uk-button-small" onClick={() => {
            setEditedComment(props.comment.comment)
            setIsEditCommentMode(true)
          }}
          ><i className="fa-regular fa-pen-to-square comment-edit-icon"></i>
            Edit
          </button>
          <button className="comment-button uk-button uk-button-danger uk-button-small" onClick={() => deleteComment()}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ) : ""
      }
    </article>
  ) : (
    <>
      <div className="comment-box" key={props.comment._id}>
        <div>@{props.comment.author.username}</div>
        <form onSubmit={handleSubmit}>
          <input
            className="uk-input comment-input"
            type="text"
            name="editedComment"
            value={editedComment}
            onChange={(e) => {
              setEditedComment(e.target.value);
            }}
            size="100"
          ></input>
          <button className="uk-align-right uk-button uk-button-default uk-button-small" type="submit">Save</button>
          <button className="uk-align-right uk-button uk-button-default uk-button-small" type="submit" onClick={() => setIsEditCommentMode(false)}>Cancel</button>
        </form>
        <div>{commentUpdatedAt}</div>
      </div>
    </>
  );
}

export default Comment;
