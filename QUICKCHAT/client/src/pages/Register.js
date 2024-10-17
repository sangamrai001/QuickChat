import React, { useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png"; 
import styled from "styled-components";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/ApiRoutes";

export default function Register() {
  const navigate = useNavigate(); 
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/setAvatar');
    }
  }, [navigate]);

  const toastOptions = {
    position: "top-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light"
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (handleValid()) {
      try {
        const { data } = await axios.post(registerRoute, values);
        if (data.success) {
          toast.success("User added successfully", toastOptions);
        } else {
          toast.error(data.message, toastOptions);
        }
      } catch (error) {
        toast.error("Error registering user", toastOptions);
      }
    }
  };

  function handleValid() {
    const { username, email, password, confirmPassword } = values;

    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be at least 3 characters long", toastOptions);
      return false;
    } else if (password.length < 6) {
      toast.error("Password should be at least 6 characters long", toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match", toastOptions);
      return false;
    } else if (!isValidEmail(email)) {
      toast.error("Enter a valid email", toastOptions);
      return false;
    }
    return true;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function changeHandler(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <FormContainer>
        <form onSubmit={submitHandler}>
          <div className="logocss">
            <img src={Logo} alt="Logo" />
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={changeHandler}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={changeHandler}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
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
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
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
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;

    &:hover {
      background-color: #3a00d4;
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
