import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logout from "../assets/user-logout.png";

export default function Logout() {
  const navigate = useNavigate();

  function clickHandler() {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <ButtonContainer onClick={clickHandler}>
      <img src={logout} alt="logout logo" />
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  width: 30px; /* Fixed width for better responsiveness */
  height: 30px; /* Fixed height for better responsiveness */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff; /* Text color */
  background-color: #007bff; /* New primary button color (Red-Orange) */
  border: none; 
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease; /* Added transform for animation */

  &:hover {
    background-color: #007fff; /* Darker shade on hover (Darker Red) */
    transform: scale(1.05); /* Scale effect on hover */
  }

  img {
    width: 70%; /* Adjust image size for better responsiveness */
    height: auto; /* Maintain aspect ratio */
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;

    img {
      width: 60%; /* Slightly smaller image on smaller screens */
    }
  }

  @media (max-width: 480px) {
    width: 25px;
    height: 25px;

    img {
      width: 50%; /* Even smaller image on very small screens */
    }
  }
`;
