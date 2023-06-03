import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Container, Row } from "react-bootstrap";

import { Context } from "./ContextProvider";
import CardSeries from "./CardSeries";
import CardCharacter from "./CardCharacter";

const PageUser = () => {
  const { token, myUsername } = useContext(Context);
  const { username } = useParams();
  const [userSeries, setUserSeries] = useState([]);
  const [userCharacters, setUserCharacters] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Getting user submissions for: ", username);
    const request = {
      method: "GET",
      url: `/submission/user/${username}`,
      // headers: { Authorization: `Bearer ${token}` },
    };
    axios.request(request).then((response) => {
      console.log("===>>", response.data);
      setUserSeries(response.data.series);
      setUserCharacters(response.data.characters);
    });
  }, []);


  return (
    <div className="user-page">
      User page for {username}
      <br/>
      These are their characters:
      <Container fluid>
        <Row>
          {userCharacters.map((character) => (
            <CardCharacter character={character} readonly={true} />
          ))}
        </Row>
      </Container>
      <br/>
      These are their series:
      <Container fluid>
        {userSeries.map((series) => (
          <CardSeries series={series} readonly={true} />
        ))}
      </Container>
    </div>
  );
};

export default PageUser;