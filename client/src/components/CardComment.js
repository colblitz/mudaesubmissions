import React from 'react';
import { useContext, useState } from "react";
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from "axios";

import { Context } from "./ContextProvider";

const CardComment = (props) => {
  const { token } = useContext(Context);

  const comment = props.comment;

  const commentId = comment ? comment._id : null;
  const [rating, setRating] = useState(comment ? comment.rating : "");
  const [text, setText] = useState(comment ? comment.text : "");

  const [editing, setEditing] = useState(comment ? false : true);

  ////

  // const editing = props.editing;
  // const readonly = props.readonly;
  const seriesId = props.seriesId;
  // const commentRemovedCallback = props.commentRemovedCallback;
  const handleAddComment = props.handleAddComment;

  const handleRemoveComment = async function (e, commentId) {
    e.preventDefault();
    console.log("Removing comment: ", commentId);

    const request = {
      method: "DELETE",
      url: "/submission/removeComment",
      headers: { Authorization: `Bearer ${token}` },
      data: { commentId },
    };
    axios.request(request)
      .then((response) => {
        console.log("===>>", response.data);
        commentRemovedCallback(commentId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editComment = () => setEditing(true);

  const submitComment = async function (e) {
    e.preventDefault();

    if (!commentId) {
      const request = {
        method: "POST",
        url: "/submission/addComment",
        headers: { Authorization: `Bearer ${token}` },
        data: {
          series: seriesId,
          rating: rating,
          text: text
        },
      };
      axios.request(request)
        .then((response) => {
          console.log("response for add comment ===>>", response.data);
          setRating("");
          setText("");
          handleAddComment(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const request = {
        method: "PUT",
        url: "/submission/updateComment",
        headers: { Authorization: `Bearer ${token}` },
        data: {
          commentId: commentId,
          rating: rating,
          text: text
        },
      };
      axios.request(request)
        .then((response) => {
          console.log("response for add comment ===>>", response.data);
          setEditing(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <tr data-commentid={commentId}>
      {!editing ? (
        <React.Fragment>
          <td>{rating}</td>
          <td>{text}</td>    
          <td>
            <Button variant="primary" size="sm" onClick={editComment}>
              Edit
            </Button>
          </td>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <td>
            <FloatingLabel controlId="flCommentRating" label="">
              <Form.Select 
                aria-label="Floating label select example" 
                onChange={(e) => setRating(e.target.value)}
                defaultValue={rating}
                value={rating} >
                <option>Select Vote</option>
                <option value="Y">Y</option>
                <option value="N">N</option>
                <option value="C">C</option>
              </Form.Select>
            </FloatingLabel>
          </td>
          <td>
            <FloatingLabel controlId="flCommentText" label="Comments">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Leave a comment here"
                defaultValue={text}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </FloatingLabel>
          </td>
          <td>
            <Button variant="primary" type="submit" size="sm" onClick={submitComment}>
              {commentId ? "Save" : "Add"}
            </Button>
          </td>
        </React.Fragment>
      )}
    </tr>
    
  )
};

export default CardComment;