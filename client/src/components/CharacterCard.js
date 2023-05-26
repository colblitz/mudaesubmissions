import { Card, Table } from 'react-bootstrap';
import "../stylesheets/CharacterCard.css";

const CharacterCard = (props) => {
  const character = props.character;
  console.log("Character card - got character");
  console.log(character);

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
    <Card className="character-card">
      <div className="grid-container">
        <div className="grid">
          <div className="embedAuthor embedMargin">
            <span className="embedAuthorName">{character.name}</span>
          </div>
          <div className="embedDescription embedMargin">
            <span>
            {character.seriesName}
            {gender}
            </span>
            <span>{roulette}</span>
          </div>
          <div className="imageContent embedWrapper embedMedia embedImage">
            <div className="imageContainer">
              <div className="imageWrapper imageZoom">
                <img className="image"
                  alt="Image"
                  src={character.imgurLink}
                />
              </div>
            </div>
          </div>
          <div className="embedFooter embedMargin">
            <span className="embedFooterText">
              {character.imgurLink}
            </span>
          </div>
        </div>
      </div>


      
    </Card>
  )
};

export default CharacterCard;







// class MouseTracker extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleMouseMove = this.handleMouseMove.bind(this);
//     this.state = { x: 0, y: 0 };
//   }

//   handleMouseMove(event) {
//     this.setState({
//       x: event.clientX,
//       y: event.clientY
//     });
//   }

//   render() {
//     return (
//       <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
//         <h1>Move the mouse around!</h1>
//         <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
//       </div>
//     );
//   }
// }




// const Footer = () => {
//   return (
//     <Card.Footer className="text-muted">
//       This is a footer.
//     </Card.Footer>
//   );
// };

// export default Footer;