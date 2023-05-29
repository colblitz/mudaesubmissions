import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import Spinner from "react-bootstrap/Spinner";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
import { Container, Button, Form, Row, Col, Card, Table, FloatingLabel } from "react-bootstrap";

import { Context } from "./ContextProvider";
import CharacterCard from "./CharacterCard";

const UserPage = () => {
	console.log("UserPage start");

  const { token, username } = useContext(Context);

  const [loading, setLoading] = useState(true);
  const [newSeries, setNewSeries] = useState({
    name: "", 
    details: ""
  });
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    gender: "Male",
    type: "Animanga",
    seriesName: "",
    imgurLink: "",
    source: "",
    role: "",
    note: ""
  });
  // const updateColor = () => {
  //   setCar(previousState => {
  //     return { ...previousState, color: "blue" }
  //   });
  // }


  // const [newName, setNewName] = useState("");
  // const [newDetails, setNewDetails] = useState("");
  const [submittedSeries, setSubmittedSeries] = useState([]);
  const [submittedCharacters, setSubmittedCharacters] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
    	console.log("Not logged in, redirecting");
      navigate("/");
    } else {
    	console.log("Is logged in, getting user submissions");
      const request = {
        method: "GET",
        url: "/submission/getUserSubmissions",
        headers: { Authorization: `Bearer ${token}` },
      };
      axios.request(request).then((response) => {
        console.log("===>>", response.data);
        setSubmittedSeries(response.data.series);
        setSubmittedCharacters(response.data.characters);
        // setSubmissions(response);
        // setLoading(false);
      });
    }
  }, []);

  const handleAddSeries = async function (e) {
    e.preventDefault();
    setLoading(true);
    const request = {
      method: "POST",
      url: "/submission/addSeries",
      headers: { Authorization: `Bearer ${token}` },
      data: newSeries,
    };
    axios.request(request)
      .then((response) => {
        console.log("===>>", response.data);
        setSubmittedSeries([...submittedSeries, response.data])
        // setSubmissions([...submissions, response]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddCharacter = async function (e) {
    e.preventDefault();
    setLoading(true);
    const request = {
      method: "POST",
      url: "/submission/addCharacter",
      headers: { Authorization: `Bearer ${token}` },
      data: newCharacter,
    };
    axios.request(request)
      .then((response) => {
        console.log("===>>", response.data);
        setSubmittedCharacters([...submittedCharacters, response.data])
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleCharacterRemoved = async function (characterId) {
    console.log(`Removing character with id ${characterId} from state array`)
    setSubmittedCharacters(submittedCharacters.filter(function(character) {
      return character._id !== characterId
    }));
  }

  // const updateValue = (e, stateSetter, stateObject, fieldName) => {
  //   stateSetter({...stateObject, fieldName: e.target.values})
  // };

  return (
    <div className="user-page">
      Hi {username}. This is your user page.

      <Container className>
        <Row>
          <Col xs={12} md={6}>
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
            </Form>
          </Col>

          <Col xs={12} md={6}>
            <Form className="container w-75" onSubmit={handleAddCharacter}>
              <h2 className="m-1">Add a Character</h2>
              <FloatingLabel controlId="floatingName" label="Name">
                <Form.Control type="text" placeholder="Name" 
                  onChange={(e) => setNewCharacter({...newCharacter, name: e.target.value})} />
              </FloatingLabel>
              <FloatingLabel controlId="floatingGender" label="Gender">
                <Form.Select aria-label="Floating label select example"
                  onChange={(e) => setNewCharacter({...newCharacter, gender: e.target.value})} >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Both">Both</option>
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel controlId="floatingType" label="Roulette Type">
                <Form.Select aria-label="Floating label select example"
                  onChange={(e) => setNewCharacter({...newCharacter, type: e.target.value})} >
                  <option value="Animanga">Animanga</option>
                  <option value="Game">Game</option>
                  <option value="Both">Both</option>
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel controlId="floatingSeriesName" label="Series Name - leave blank if adding to a series">
                <Form.Control type="text" placeholder="Name" 
                  onChange={(e) => setNewCharacter({...newCharacter, seriesName: e.target.value})} />
              </FloatingLabel>
              <FloatingLabel controlId="floatingImgurLink" label="Imgur Link">
                <Form.Control type="text" placeholder="Name" 
                  onChange={(e) => setNewCharacter({...newCharacter, imgurLink: e.target.value})} />
              </FloatingLabel>
              <FloatingLabel controlId="floatingName" label="Image Source">
                <Form.Control type="text" placeholder="Name" 
                  onChange={(e) => setNewCharacter({...newCharacter, source: e.target.value})} />
              </FloatingLabel>
              <FloatingLabel controlId="floatingName" label="Role">
                <Form.Control type="text" placeholder="Name" 
                  onChange={(e) => setNewCharacter({...newCharacter, role: e.target.value})} />
              </FloatingLabel>
              <FloatingLabel controlId="floatingName" label="Note">
                <Form.Control type="text" placeholder="Name" 
                  onChange={(e) => setNewCharacter({...newCharacter, note: e.target.value})} />
              </FloatingLabel>

              <Button variant="primary" type="submit" className="m-2">
                Add Character Suggest
              </Button>
              <Button variant="primary" type="submit" className="xs-2 d-sm-none">
                Mobile Add
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <Container fluid>
        <Row>
          {submittedCharacters.map((character) => (
            <CharacterCard character={character} characterRemoved={handleCharacterRemoved} />
          ))}
        </Row>
      </Container>


      <Container fluid>
        {submittedSeries.map((series) => (
          <Card>
            <Card.Header>{series.name}</Card.Header>
            <Card.Body>
              {series.details}
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default UserPage;