import React from 'react';
import { useContext } from "react";
import { Col, Card, Button } from 'react-bootstrap';
import axios from "axios";

import "../stylesheets/CharacterCard.css";

import { Context } from "./ContextProvider";

const CharacterCard = (props) => {
  const { token } = useContext(Context);

  const character = props.character;
  const readonly = props.readonly;
  const characterRemoved = props.characterRemoved;

  const handleRemoveCharacter = async function (e, characterId) {
    e.preventDefault();
    console.log("Remove character ", characterId);
    
    const request = {
      method: "DELETE",
      url: "/submission/removeCharacter",
      headers: { Authorization: `Bearer ${token}` },
      data: { characterId },
    };
    axios.request(request)
      .then((response) => {
        console.log("===>>", response.data);
        characterRemoved(characterId);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const female = (
    <span className="emojiContainer">
      <img aria-label=":female:" src="https://cdn.discordapp.com/emojis/452463537508450304.webp?size=44&amp;quality=lossless" alt=":female:"  />
    </span>
  );
  const male = (
    <span className="emojiContainer">
      <img aria-label=":male:" src="https://cdn.discordapp.com/emojis/452470164529872899.webp?size=44&amp;quality=lossless" alt=":male:" />
    </span>
  );
  var gender = male;
  if (character.gender == "Female") {
    gender = female;
  }
  if (character.gender == "Both") {
    gender = (
      <React.Fragment>
        {female}
        {male}
      </React.Fragment>
    );
  }

  var roulette = (<em>Game &amp; Animanga</em>);
  if (character.type == "Animanga") {
    roulette = (<em>Animanga</em>);
  }
  if (character.type == "Game") {
    roulette = (<em>Game</em>); 
  }

  return (
    <Col xs="auto">
      <Card className="character-card">
        <div className="grid-container">
          <div className="grid">
            <div className="embedAuthor embedMargin">
              <span className="embedAuthorName">{character.name}</span>
            </div>
            <div className="embedText embedMargin">
              {character.seriesName}
              {gender}
              {"\n"}{roulette}
            </div>
            <div className="embedImage">
              <div className="imageContainer">
                <div className="imageWrapper imageZoom">
                  <img className="image"
                    alt="Image"
                    src={character.imgurLink}
                  />
                </div>
              </div>
            </div>
            <div className="embedText embedMargin">
              {character.imgurLink}
              {"\n"}Source: {character.source}
              {"\n"}Role: {character.role}
              {"\n"}Note: {character.note}
            </div>
            {!readonly && (
            <Button variant="danger" size="sm" onClick={(e) => handleRemoveCharacter(e, character._id)}>
              Remove
            </Button>)}
          </div>
        </div>    
      </Card>
    </Col>
  )
};

export default CharacterCard;