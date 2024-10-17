import styled from "styled-components";
import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

export default function ChatInput({ handleMessage }) {
  const [message, setMessage] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(false);

  const handleEmoji = () => {
    setEmojiPicker(!emojiPicker);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (message.length > 0) {
      handleMessage(message);
      setMessage("");
    }
  };

  const addEmoji = (emoji) => {
    const emojiChar = emoji.native; // Get the emoji character
    setMessage((prevMessage) => prevMessage + emojiChar);
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji" onClick={handleEmoji}>
          <BsEmojiSmileFill />
        </div>
        {emojiPicker && (
          <div className="emoji-picker-container">
            <Picker data={data} onEmojiSelect={addEmoji} />
          </div>
        )}
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="Type your message here"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}                
        />
        <button className="submit" type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #1e1e2f; /* Darker shade for the container */
  padding: 0.7rem;
  border-radius: 10px;
  position: relative;

  .button-container {
    display: flex;
    align-items: center;
    position: relative;

    .emoji {
      font-size: 1.5rem;
      color: #ffd700; /* Gold color for emoji icon */
      margin-right: 1rem;
      cursor: pointer;
    }

    .emoji-picker-container {
      position: absolute;
      top: -490px;
      z-index: 100;
      left: 0.5rem;
      right: 0;
      background-color: #ffffff; /* White background for emoji picker */
      border-radius: 10px;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
    }
  }

  .input-container {
    display: flex;
    align-items: center;
    flex: 1;

    input {
      flex: 1;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      border: none;
      outline: none;
      font-size: 1rem;
      background-color: #2e2e3e; /* Lighter shade for input background */
      color: #ffffff; /* White text for input */
      margin-right: 1rem;
    }

    button {
      background-color: #007bff; /* Blue background for send button */
      border: none;
      padding: 0.6rem;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        color: white; /* White icon for send button */
        font-size: 1.5rem;
      }
    }
  }
`;
