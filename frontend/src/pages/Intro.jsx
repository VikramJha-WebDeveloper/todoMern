import React from "react";
import styled from "styled-components";

const IntroSection = styled.div`
  .intro-section {
            height: 100vh;
            background: linear-gradient(to right, #6a11cb, #2575fc);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            flex-direction: column;
        }

        .btn-custom {
            background-color: #f39c12;
            color: white;
            padding: 15px 30px;
            font-size: 18px;
            border-radius: 50px;
            transition: all 0.3s ease;
        }

        .btn-custom:hover {
            background-color: #e67e22;
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
        }

        .intro-heading {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .intro-description {
            font-size: 1.25rem;
            margin-bottom: 30px;
        }

        .scroll-indicator {
            font-size: 1.5rem;
            margin-top: 30px;
        }
`;

const Intro = () => {
  return (
    <IntroSection>
      <section className="intro-section">
        <div className="container">
          <h1 className="intro-heading">Welcome to the To-Do List App</h1>
          <p className="intro-description">
            Organize your tasks and stay productive. Easily manage your daily
            to-dos with a simple and elegant interface.
          </p>
          <p className="scroll-indicator">Scroll Down to Learn More</p>
        </div>
        <div className="d-flex justify-content-between" style={{width: "160px"}}>
        <a href="/login" className="btn btn-primary">Login</a>
        <a href="/registration" className="btn btn-secondary">Register</a>
      </div>
      </section>
    </IntroSection>
  );
};

export default Intro;
