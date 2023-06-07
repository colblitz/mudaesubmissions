import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Card, Container, Row, Table } from "react-bootstrap";

import { Context } from "./ContextProvider";
import CardCharacter from "./CardCharacter";
import CardComment from "./CardComment";

const CardSeries = (props) => {
  const { token } = useContext(Context);

  console.log("rendering series: ", props.series);


  const readonly = props.readonly;
  const showComments = props.showComments;
  
  const series = props.series;
  console.log(series);
  console.log(series.characters);
  
  const [characters, setCharacters] = useState(series.characters);
  const [comments, setComments] = useState(series.comments);

  console.log("this series has characters: ", characters);

  useEffect(() => {
    console.log("in use effect, with props", props);
    setCharacters(props.series.characters);
    // setScrolled(scrollYPos >= 1);
  }, [props.series]);

  const handleCharacterRemoved = async function (characterId) {
    console.log(`Removing character with id ${characterId} from state array`)
    setCharacters(characters.filter(function(character) {
      return character._id !== characterId
    }));
  };

  const handleCommentRemoved = async function (commentId) {
    console.log(`Removing comment with id ${commentId} from state array`)
    setComments(comments.filter(function(comment) {
      return comment._id !== commentId
    }));
  };

  const handleAddComment = async function (newComment) {
    console.log("Adding new comment to beginning?", newComment);
    const newComments = [newComment, ...comments];
    setComments(newComments);
  };

  return (
    <Card>
      <Card.Header>{series.name}</Card.Header>
      <Card.Body>
        {series.details}
      </Card.Body>
      <Card.Body>
        <Container fluid>
          <Row>
            {characters.map((character) => (
              <CardCharacter key={character._id} character={character} characterRemoved={handleCharacterRemoved} readonly={readonly} />
            ))}
          </Row>
        </Container>
      </Card.Body>
      {showComments && (
        <Card.Body>
          <Table>
            <tbody>
              <CardComment seriesId={series._id} handleAddComment={handleAddComment} />
              {comments && comments.map((comment) => (
                <CardComment key={comment._id} comment={comment} seriesId={series._id} />
              ))}
            </tbody>
          </Table>
        </Card.Body>
      )}
      
    </Card>
  )
};

export default CardSeries;