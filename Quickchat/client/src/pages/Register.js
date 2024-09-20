
import React from "react"; 
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg" ; 
import styled from "styled-components";
import { useState,useEffect } from "react";
import {ToastContainer ,toast } from "react-toastify";
import "react-toastify/ReactToastify.css"
import axios from "axios";
import { registerRoute } from "../utils/ApiRoutes";

export default function Register(){

    const [values , setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""

    })
   const toastoptions = {
    position:"top-right",
                autoClose:4000,
                pauseOnHover:true,
                draggable:true,
                theme:"light"
   }
    const submitHandler = async(event)=>{
        event.preventDefault() ; 
        if(handleValid()){
            const data = values ;
            const help = axios.post("http://localhost:4000/api/v1/register", values)
            if(help.status===true){
              toast.success("user added successfully" , toastoptions) ; 
            }
            else{
              toast.error(help.message , toastoptions) ;
            }
            // .then(response => {
            //   console.log(response.data);
            // })
            // .catch(error => {
            //   console.error(error);
            // });
            // try{
            //   console.log("this is succ");
            // }
            // catch(err){
            //   console.error(err);
            // }
            
        }
    }
    function handleValid(){
        const {username , email , password ,confirmPassword} = values ;
        if (!username || !email || !password || !confirmPassword ){
            
            toast.error("Please fill the form first",toastoptions)
            return false ; 
        }
        else if(password!==confirmPassword){
            toast.error("Password and Confirm Password didn't matched",toastoptions)
            return false ; 
        }
        else if(username.length<3){
            toast.error("Username length should be greater than 3",toastoptions)
        }
        else if(password.length<6){
            toast.error("Password length should be greater than or equal to 6 characters",toastoptions)
        }
        else if(email.length<8){
            toast.error("Enter a valid Email",toastoptions)
      
        }
        // else if(email.length>=8){
        //     let num = 0; 
        //     for(let ch of email){
        //         console.log(ch);
        //         if(ch =='@'){
        //             num = 1 ; 
        //         }
        //     }
        //     if(num===0){
        //         alert("there");
        //         toast.error("Enter a valid Email",toastoptions)
        //         return false ; 
        //     }
        //     return true ;    
        // }
        return true ; 
    }
    function changeHandler(event){
        // const {username , email , password , confirmPassword } = event.target ; 
        setValues({
            ...values , [event.target.name] :event.target.value
        })
    }
    return <div >
        <FormContainer>
        <form onSubmit={submitHandler} className="parent">
            <div className="logocss">
                <img src={Logo} alt="Logo"></img>
            </div>
            <input type="text" placeholder="Username"
            name="username" onChange={changeHandler}
            ></input>
            <input type="email" placeholder="Email"
            name="email" onChange={changeHandler}
            ></input>
            <input type="password" placeholder="Password"
            name="password" onChange={changeHandler}
            ></input>
            <input type="password" placeholder="Confirm Password"
            name="confirmPassword" onChange={changeHandler}
            ></input>
            <button type="submit">Create User</button>
            <span>Already have a account? <Link to="/login">Login</Link></span>

        </form>
        </FormContainer>
        <ToastContainer/>
        
    </div>
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
      background-color: #4e0eff;
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
