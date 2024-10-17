import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Contact from "../components/Contact";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { alluserRoute, host } from "../utils/ApiRoutes";
import Welcome from "../components/Welcome";
import Chatcontainer from "../components/Chatcontainer";
import { io } from "socket.io-client";

export default function Chat() {
  const socket = useRef();
  const [userdata, setUserdata] = useState(null);
  const [fetchdata, setFetchedData] = useState([]);
  const [currChat, setCurrChat] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = () => {
      const userData1 = localStorage.getItem("chat-app-user");
      if (userData1) {
        const parsedData = JSON.parse(userData1);
        setUserdata(parsedData);
      } else {
        navigate('/login');
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userdata) {
      socket.current = io(host);
      socket.current.emit("add-user", userdata._id);
    }
  }, [userdata]);

  const handleChatChange = (chat) => {
    setCurrChat(chat);
  };

  useEffect(() => {
    const fetchAdditionalUserData = async () => {
      if (userdata) {
        if (userdata.isavaImage) {
          try {
            const response = await axios.get(`${alluserRoute}/${userdata.username}`);
            setFetchedData(response.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        } else {
          navigate('/setAvatar');
        }
      }
    };

    fetchAdditionalUserData();
  }, [userdata]);

  return (
    <Container>
      <div className="container">
        <Contact userdata={userdata} fetchdata={fetchdata} handleChatChange={handleChatChange} />
        {
          currChat === undefined ? (
            <Welcome userdata={userdata} />
          ) : (
            <Chatcontainer userdata={userdata} currChat={currChat} socket={socket} />
          )
        }
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076; /* Semi-transparent background */
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
