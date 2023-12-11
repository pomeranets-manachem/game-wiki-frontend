import { useState } from "react";
import gameService from "../services/game.service";

function Comment(props) {
  const [isEditCommentMode, setIsEditCommentMode] = useState(false);
  const [editedComment, setEditedComment] = useState(props.comment.comment);

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
    <div className="comment-box" key={props.comment._id}>
      <div>{props.comment.author.username}</div>
      <div>{props.comment.comment}</div>
      <div>{props.comment.createdAt}</div>
      {props.user && props.user.username === props.comment.author.username ? (
        <div>
            <button onClick={() => setIsEditCommentMode(true)}>Edit</button>
            <button onClick={() =>deleteComment()}>Delete</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  ) : (
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
  );
}

export default Comment;
