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
    console.log("Getting all submissions");
    const request = {
      method: "GET",
      url: "/submission/getAllSeries",
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.request(request).then((response) => {
      console.log("response for get all submissions ===>>", response.data);
      setSubmittedSeries(response.data);
    });
  }, []);


  return (
    <div className="series-page">
      <Container fluid>
        {submittedSeries.map((series) => (
          <SeriesCard series={series} readonly={true} />
        ))}
      </Container>
    </div>
  );
};

export default SeriesSubmissions;