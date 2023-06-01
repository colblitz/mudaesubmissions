import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Card, Container, Row } from "react-bootstrap";

import { Context } from "./ContextProvider";
import CharacterCard from "./CharacterCard";

const SeriesCard = (props) => {
  const { token } = useContext(Context);

  const readonly = props.readonly;
  const series = props.series;
  const [characters, setCharacters] = useState(series.characters);

  const handleCharacterRemoved = async function (characterId) {
    console.log(`Removing character with id ${characterId} from state array`)
    setCharacters(characters.filter(function(character) {
      return character._id !== characterId
    }));
  }

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
              <CharacterCard character={character} characterRemoved={handleCharacterRemoved} readonly={readonly} />
            ))}
          </Row>
        </Container>
      </Card.Body>
    </Card>
  )
};

export default SeriesCard;