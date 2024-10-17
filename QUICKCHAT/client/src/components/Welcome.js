import React, { useEffect, useState } from "react";
import styled from "styled-components";
import robot from "../assets/robot.gif";

export default function Welcome({ userdata }) {
  const [name, setName] = useState(undefined);

  useEffect(() => {
    if (userdata) {
      setName(userdata.username);
    }
  }, [userdata]);

  return (
    <Container>
      <img src={robot} alt="robot" />
      <h1>
        Welcome, <span>{name}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #e0e0e0; /* Light text color */

  img {
    width: 50%;
    max-width: 200px;
    height: auto;
  }

  h1 {
    font-size: 2rem;
    margin-top: 20px;
  }

  span {
    color: #4e0eff; /* Highlight color */
  }

  h3 {
    margin-top: 10px;
    font-weight: 300;
    color: #ccc; /* Slightly darker text */
  }
`;
