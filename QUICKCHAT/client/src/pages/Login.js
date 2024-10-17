import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/ApiRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("chat-app-user");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.isavaImage) {
        navigate("/");
      } else {
        navigate("/setAvatar");
      }
    }
  }, [navigate]);

  const toastOptions = {
    position: "top-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (handleValid()) {
      try {
        const { data } = await axios.post(loginRoute, values);
        if (data.success) {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          if (data.user.isavaImage) {
            navigate("/");
          } else {
            navigate("/setAvatar");
          }
        } else {
          toast.error(data.message, toastOptions);
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.", toastOptions);
      }
    }
  };

  function handleValid() {
    const { username, password } = values;
    if (!username || !password) {
      toast.error("Please fill in all fields", toastOptions);
      return false;
    }
    return true;
  }

  function changeHandler(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div>
      <FormContainer>
        <form onSubmit={submitHandler} className="parent">
          <div className="logocss">
            <img src={Logo} alt="Logo" />
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={changeHandler}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={changeHandler}
            min="6"
          />
          <button type="submit">Log In</button>
          <span>
            New User? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </div>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .logocss {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076; /* Semi-transparent background */
    border-radius: 2rem;
    padding: 3rem 5rem;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;

    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

  button {
    background-color: #4e0eff; /* Primary button color */
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;

    &:hover {
      background-color: #3b0ed4; /* Darker shade on hover */
    }
  }

  span {
    color: white;
    text-transform: uppercase;

    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
