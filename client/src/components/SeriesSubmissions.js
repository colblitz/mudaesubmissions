import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Container, Button, Form, Row, Col, Card, Table, FloatingLabel } from "react-bootstrap";

import { Context } from "./ContextProvider";
import SeriesCard from "./SeriesCard";

const SeriesSubmissions = () => {
  const { token, username } = useContext(Context);

  const [loading, setLoading] = useState(true);
  const [submittedSeries, setSubmittedSeries] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
    	console.log("Not logged in, redirecting");
      navigate("/");
    } else {
    	console.log("Is logged in, getting all submissions");
      const request = {
        method: "GET",
        url: "/submission/getAllSeries",
        headers: { Authorization: `Bearer ${token}` },
      };
      axios.request(request).then((response) => {
        console.log("response for get all submissions ===>>", response.data);
        setSubmittedSeries(response.data);
      });
    }
  }, []);


  return (
    <div className="user-page">
      <Container fluid>
        {submittedSeries.map((series) => (
          <SeriesCard series={series}/>
        ))}
      </Container>
    </div>
  );
};

export default SeriesSubmissions;