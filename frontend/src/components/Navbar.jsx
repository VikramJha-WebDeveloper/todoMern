import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";

const NavbarSection = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Navbar = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const showUserName = async () => {
      try {
        const response = await fetch("http://localhost:8000/showUserName", {
          credentials: "include",
        });
        const result = await response.json();
        if (result) {
          console.log("modi");
          setUserName(result.userName);
        }
      } catch (err) {
        console.log(err);
      }
    };
    showUserName();
  }, []);

  const navigate = useNavigate();

  const logout = async() => {
    setUserName("");
    const response = await fetch("http://localhost:8000/logout", {
      method: "post",
      headers: {"Content-Type":"application/json"},
      credentials: "include"
    });
    const result = await response.json();
    if(result){
      console.log(result);
      navigate("/login");
      toast.success(result.message)
    }
    console.log(result);

  }
  // const logout = async () => {
  //   try {
  //     setUserName("");
  //     const response = await fetch("http://localhost:8000/logout", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     const result = await response.json();
  //     console.log(result);
  //     navigate("/login");
  //     toast.success(result.message);
  //   } catch (error) {
  //     console.log(err);
  //   }
  // };

  return (
    <NavbarSection>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold" to="/">
            TODOLIST
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Intro
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {userName}
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink onClick={logout} className="dropdown-item">
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </NavbarSection>
  );
};

export default Navbar;
