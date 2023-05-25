import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import Spinner from "react-bootstrap/Spinner";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
import { Container, Button, Form, Row, Card } from "react-bootstrap";

import { Context } from "./ContextProvider";

const UserPage = () => {
	console.log("UserPage start");

  const { token, username } = useContext(Context);

  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newDetails, setNewDetails] = useState("");
  const [submittedSeries, setSubmittedSeries] = useState([]);

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
      data: {
        name: newName,
        details: newDetails
      },
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

  return (
    <div className="user-page">
      Hi {username}. This is your user page.

      <Form className="container w-75" onSubmit={handleAddSeries}>
        <h2 className="m-1">Add a Series</h2>
        <Form.Group className="mb-3" controlId="seriesName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Series Name" 
            onChange={(e) => setNewName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="m-2" controlId="seriesDetails">
          <Form.Label>Details</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your details"
            onChange={(e) => setNewDetails(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="m-2">
          Add
        </Button>
      </Form>

      <Container>
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