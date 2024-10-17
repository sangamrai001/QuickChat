import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./Chatinput";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const { sendmessageRoute, getallmessageRoute } = require("../utils/ApiRoutes.js");

export default function ChatContainer({ userdata, currChat, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrival, setArrivalMessage] = useState(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (currChat) handleGetMessage();
  }, [currChat]);

  const handleGetMessage = async () => {
    try {
      const response = await axios.get(getallmessageRoute, {
        params: { from: userdata._id, to: currChat._id },
      });
      setMessages(response.data || []);
    } catch (error) {
      console.error("Failed to get messages", error);
      setMessages([]);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.off("msg-receive");
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket, currChat]);

  useEffect(() => {
    if (arrival) setMessages((prev) => [...prev, arrival]);
  }, [arrival]);

  const handleMessage = async (msg) => {
    const newMessage = { fromSelf: true, message: msg };
    setMessages((prev) => [...prev, newMessage]);

    try {
      await axios.post(sendmessageRoute, {
        from: userdata._id,
        to: currChat._id,
        message: msg,
      });

      socket.current.emit("send-msg", {
        to: currChat._id,
        from: userdata._id,
        message: msg,
      });
    } catch (error) {
      console.error("Failed to send message", error);
      setMessages((prev) => prev.filter((m) => m !== newMessage));
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currChat?.avaImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currChat?.username}</h3>
          </div>
        </div>
        <Logout />
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div ref={messageEndRef} key={uuidv4()}>
            <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ChatInput handleMessage={handleMessage} socket={socket} />
    </Container>
  );
}

const Container = styled.div`
  height: 85vh;
  display: grid;
  grid-template-rows: 8% 85% 8%;
  gap: 0.1rem;
  background-color: #121212; /* Darker background for the chat container */
  padding: 1rem;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      padding: 0.5rem 0;
    }

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      @media (max-width: 768px) {
        gap: 0.5rem;
      }

      .avatar img {
        height: 3rem;
        border-radius: 50%;
      }

      .username h3 {
        color: #ffffff; /* White for the username */
        font-size: 1.2rem; /* Adjust font size for smaller screens */
      }
    }

    // Logout button styling
    .logout {
      font-size: 1rem; /* Default size */
      padding: 0.4rem 0.8rem; /* Padding for better clickability */

      @media (max-width: 768px) {
        font-size: 0.9rem; /* Smaller font size for mobile */
        padding: 0.3rem 0.6rem; /* Adjust padding */
      }
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;

    @media (max-width: 768px) {
      padding: 0.5rem 1rem;
    }

    &::-webkit-scrollbar {
      width: 0.2rem;

      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .message {
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      max-width: 70%;
      word-wrap: break-word;

      &.sended {
        background-color: #007bff; /* Blue for sent messages */
        margin-left: auto;
        color: white;

        .content p {
          color: white;
        }
      }

      &.received {
        background-color: #2b2b2b; /* Darker shade for received messages */
        color: #ffffff;

        .content p {
          color: #ffffff;
        }
      }
    }
  }
`;
