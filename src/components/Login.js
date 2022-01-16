import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        console.log("signed in successfully.");
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        //console.log(auth);
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.message);
        setEmail("");
        setPassword("");
      });

    console.log("account created successfully");
  };

  return (
    <LoginContainer>
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>
      <LoginFieldsContainer>
        <h1>Sig-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button
          onClick={register}
          type="submit"
          className="login__registerButton"
        >
          Create your Amazon account
        </button>
      </LoginFieldsContainer>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: white;

  .login__logo {
    margin-top: 20px;
    margin-bottom: 20px;
    object-fit: contain;
    width: 100px;
    margin-right: auto;
    margin-left: auto;
  }
`;

const LoginFieldsContainer = styled.div`
  width: 300px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid lightgray;
  padding: 20px;

  > h1 {
    font-weight: 500;
    margin-bottom: 20px;
  }

  > form {
    display: flex;
    flex-direction: column;
  }

  > form > h5 {
    margin-bottom: 5px;
  }

  > form > input {
    height: 30px;
    margin-bottom: 10px;
    background-color: white;
    padding: 0 10px;
  }

  p {
    margin-top: 15px;
    font-size: 12px;
  }

  .login__signInButton {
    background: #f0c14b;
    border-radius: 2px;
    width: 100%;
    height: 30px;
    border: 1px solid;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    cursor: pointer;
    transition: all 200ms ease-in-out;
    :hover {
      transform: scale(1.02);
    }
  }

  .login__registerButton {
    border-radius: 2px;
    width: 100%;
    height: 30px;
    border: 1px solid;
    margin-top: 10px;
    border-color: darkgray;
    cursor: pointer;
    transition: all 200ms ease-in-out;
    :hover {
      transform: scale(1.02);
    }
  }
`;
