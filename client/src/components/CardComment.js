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
    <tr>
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
                defaultValue={rating} >
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

/*
<Card className="card-comment">
      {!editing && (
        <div>
          {comment.rating}: {comment.text}
          <Button variant="primary" type="submit" className="m-2">
            Add
          </Button>
        </div>
      )}
      {!comment && (
        <Form className="container w-75" onSubmit={handleAddSeries}>
          <h2 className="m-1">Add a Series</h2>
          <Form.Group className="mb-3" controlId="seriesName">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Series Name" 
              onChange={(e) => setNewSeries({...newSeries, name: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="m-2" controlId="seriesDetails">
            <Form.Label>Details</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your details"
              onChange={(e) => setNewSeries({...newSeries, details: e.target.value})}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="m-2">
            Add
          </Button>
        </div>
      )}

    </Card>

class App extends Component {
  initialState = {
    store: [
      { id: 1, item: 'silver', price: 15.41 },
      { id: 2, item: 'gold', price: 1284.3 },
      { id: 3, item: 'platinum', price: 834.9 },
    ],
    row: {
      item: '',
      price: '',
    },
  }

  state = this.initialState
  firstEditable = React.createRef()

  addRow = () => {
    const { store, row } = this.state
    const trimSpaces = (string) => {
      return string
        .replace(/&nbsp;/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
    }
    const trimmedRow = {
      ...row,
      item: trimSpaces(row.item),
    }

    row.id = store.length + 1

    this.setState({
      store: [...store, trimmedRow],
      row: this.initialState.row,
    })

    this.firstEditable.current.focus()
  }

  deleteRow = (id) => {
    const { store } = this.state

    this.setState({
      store: store.filter((item) => id !== item.id),
    })
  }

  disableNewlines = (event) => {
    const keyCode = event.keyCode || event.which

    if (keyCode === 13) {
      event.returnValue = false
      if (event.preventDefault) event.preventDefault()
    }
  }

  validateNumber = (event) => {
    const keyCode = event.keyCode || event.which
    const string = String.fromCharCode(keyCode)
    const regex = /[0-9,]|\./

    if (!regex.test(string)) {
      event.returnValue = false
      if (event.preventDefault) event.preventDefault()
    }
  }

  pasteAsPlainText = (event) => {
    event.preventDefault()

    const text = event.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  highlightAll = () => {
    setTimeout(() => {
      document.execCommand('selectAll', false, null)
    }, 0)
  }

  handleContentEditable = (event) => {
    const { row } = this.state
    const {
      currentTarget: {
        dataset: { column },
      },
      target: { value },
    } = event

    this.setState({ row: { ...row, [column]: value } })
  }

  handleContentEditableUpdate = (event) => {
    const {
      currentTarget: {
        dataset: { row, column },
      },
      target: { value },
    } = event

    this.setState(({ store }) => {
      return {
        store: store.map((item) => {
          return item.id === parseInt(row, 10)
            ? { ...item, [column]: value }
            : item
        }),
      }
    })
  }

  render() {
    const {
      store,
      row: { item, price },
    } = this.state

    return (
      <div className="App">
        <h1>React Contenteditable</h1>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Item</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {store.map((row, i) => {
              return (
                <Table.Row key={row.id}>
                  <Table.Cell className="narrow">
                    <ContentEditable
                      html={row.item}
                      data-column="item"
                      data-row={i}
                      className="content-editable"
                      onKeyPress={this.disableNewlines}
                      onPaste={this.pasteAsPlainText}
                      onFocus={this.highlightAll}
                      onChange={this.handleContentEditableUpdate}
                    />
                  </Table.Cell>
                  <Table.Cell className="narrow">
                    <ContentEditable
                      html={row.price.toString()}
                      data-column="price"
                      data-row={i}
                      className="content-editable"
                      onKeyPress={this.validateNumber}
                      onPaste={this.pasteAsPlainText}
                      onFocus={this.highlightAll}
                      onChange={this.handleContentEditableUpdate}
                    />
                  </Table.Cell>
                  <Table.Cell className="narrow">
                    <Button
                      onClick={() => {
                        this.deleteRow(row.id)
                      }}
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              )
            })}
            <Table.Row>
              <Table.Cell className="narrow">
                <ContentEditable
                  html={item}
                  data-column="item"
                  className="content-editable"
                  innerRef={this.firstEditable}
                  onKeyPress={this.disableNewlines}
                  onPaste={this.pasteAsPlainText}
                  onFocus={this.highlightAll}
                  onChange={this.handleContentEditable}
                />
              </Table.Cell>
              <Table.Cell className="narrow">
                <ContentEditable
                  html={price}
                  data-column="price"
                  className="content-editable"
                  onKeyPress={this.validateNumber}
                  onPaste={this.pasteAsPlainText}
                  onFocus={this.highlightAll}
                  onChange={this.handleContentEditable}
                />
              </Table.Cell>
              <Table.Cell className="narrow">
                <Button disabled={!item || !price} onClick={this.addRow}>
                  Add
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    )
  }
}*/