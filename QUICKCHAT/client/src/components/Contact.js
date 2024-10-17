import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Contact({ userdata, fetchdata, handleChatChange }) {
  const navigate = useNavigate();
  const [currusername, setCurrusername] = useState(undefined);
  const [curruserimage, setCurruserimage] = useState(undefined);
  const [currselected, setCurrselected] = useState(undefined);
  const [datas, setdata] = useState([]);

  useEffect(() => {
    if (userdata) {
      setCurrusername(userdata.username);
      setCurruserimage(userdata.avaImage);
    }
  }, [userdata]);

  useEffect(() => {
    if (fetchdata) {
      setdata(fetchdata.data);
    }
  }, [fetchdata]);

  const changecurrchat = (index, contact) => {
    setCurrselected(index);
    handleChatChange(contact);
  };

  return (
    <Container>
      {currusername && curruserimage !== undefined && (
        <>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h3>QuickChat</h3>
          </div>
          <div className="contacts">
            {datas && datas.length > 0 ? (
              datas.map((data, index) => (
                <div
                  className={`contact ${currselected === index ? "selected" : ""}`}
                  key={index}
                  onClick={() => changecurrchat(index, data)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${data.avaImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{data.username}</h3>
                  </div>
                </div>
              ))
            ) : (
              <div>No contacts available</div>
            )}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${curruserimage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currusername}</h2>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #0d0d1c; /* Dark background color */
  color: #e0e0e0; /* Light text color */
  overflow: hidden;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 2px solid #4e0eff;

    img {
      height: 2rem;
    }

    h3 {
      color: #e0e0e0; /* Light text color */
      text-transform: uppercase;
      font-weight: 500;
      font-size: 1.5rem;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 0.5rem;
    height: 100%;
    overflow-y: auto;

    .contact {
      background-color: #1a1a2e; /* Slightly lighter background for contacts */
      min-height: 3rem;
      display: flex;
      align-items: center;
      padding: 0.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;
      gap: 1rem;

      &:hover {
        background-color: #4e0eff; /* Highlight color */
      }

      .avatar {
        img {
          height: 3rem;
          border-radius: 50%;
        }
      }

      .username {
        h3 {
          color: #e0e0e0; /* Light text color */
          font-size: 1.2rem;
          margin: 0;
        }
      }
    }

    .selected {
      background-color: #4e0eff; /* Highlight color for selected */
      border: 1px solid #e0e0e0; /* Light border for selected */
    }
  }

  .current-user {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1a1a2e; /* Slightly lighter background */
    padding: 1rem;
    border-top: 2px solid #4e0eff;
    gap: 1rem;

    .avatar {
      img {
        height: 4rem;
        border-radius: 50%;
      }
    }

    .username {
      h2 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 500;
        color: #e0e0e0; /* Light text color */
      }
    }
  }
`;
