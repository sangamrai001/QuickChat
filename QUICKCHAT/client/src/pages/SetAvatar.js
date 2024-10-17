import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/ApiRoutes";
import { Buffer } from "buffer";

export default function SetAvatar() {
  const api = "https://api.multiavatar.com"; // Avatar API
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAva, setSelectedAva] = useState(undefined);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chat-app-user"));
    if (!user) {
      navigate("/login");
    } else if (user.isAvatarSet) {
      navigate("/");
    } else {
      fetchData();
    }
  }, [navigate]);

  const toastOptions = {
    position: "top-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const setProfile = async () => {
    if (selectedAva === undefined) {
      toast.error("Please select an avatar", toastOptions);
      return;
    }

    const user = JSON.parse(localStorage.getItem("chat-app-user"));
    try {
      const { data } = await axios.post(`${setAvatarRoute}/${user.username}`, {
        image: avatars[selectedAva],
      });

      if (data.isSet) {
        user.isAvatarSet = true;
        user.avaImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    } catch (err) {
      toast.error("Error setting avatar. Please try again.", toastOptions);
    }
  };

  const fetchData = async () => {
    try {
      const avatarData = await Promise.all(
        Array.from({ length: 4 }, async () => {
          const image = await axios.get(`${api}/${Math.random()}.svg`);
          return Buffer.from(image.data).toString("base64");
        })
      );
      setAvatars(avatarData);
    } catch (error) {
      console.error("Error fetching avatars:", error);
      toast.error("Error loading avatars. Please refresh the page.", toastOptions);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {isLoading ? (
        <LoaderContainer>
          <img className="loader" src={loader} alt="loader" />
        </LoaderContainer>
      ) : (
        <>
          <TitleContainer>
            <h1>Pick an Avatar as your profile picture</h1>
          </TitleContainer>
          <AvatarsContainer>
            {avatars.map((avatar, index) => (
              <Avatar
                key={index}
                className={selectedAva === index ? "selected" : ""}
                onClick={() => setSelectedAva(index)}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt={`avatar-${index}`}
                />
              </Avatar>
            ))}
          </AvatarsContainer>
          <SubmitButton onClick={setProfile}>
            Set as Profile Picture
          </SubmitButton>
        </>
      )}
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  background-color: #1e1e2f;
  height: 100vh;
  width: 100vw;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

  .loader {
    width: 50px;
    height: 50px;
  }
`;

const TitleContainer = styled.div`
  h1 {
    color: white;
    text-align: center;
  }
`;

const AvatarsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const Avatar = styled.div`
  cursor: pointer;
  border: 0.2rem solid transparent;
  border-radius: 50%;
  overflow: hidden;
  transition: 0.2s ease-in-out;

  &.selected {
    border-color: #4e0eff;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SubmitButton = styled.button`
  background-color: #4e0eff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;

  &:hover {
    background-color: #3a00d4;
  }
`;
