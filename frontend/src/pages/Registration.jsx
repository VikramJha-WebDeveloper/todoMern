import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const collectData = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:8000/registration", {
            method: "post",
            body: JSON.stringify({name, email, password, confirmPassword}),
            headers: {"Content-Type":"application/json"}
        });
        const result = await response.json();
        if(result.message){
            navigate("/login");
            toast.success(result.message)
        }else{
          toast.error(result.errMessage)
        };
    };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Create an Account</h2>
            <form onSubmit={collectData} method="POST">
              <div className="mb-3">
                <label for="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  onChange={(e)=>setName(e.target.value)}
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="name"
                  value={name}
                  required
                />
              </div>

              <div className="mb-3">
                <label for="email" className="form-label">
                  Email address
                </label>
                <input
                  onChange={(e)=>setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  required
                />
              </div>

              <div className="mb-3">
                <label for="password" className="form-label">
                  Password
                </label>
                <input
                  onChange={(e)=>setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  required
                />
              </div>

              <div className="mb-3">
                <label for="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  required
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
            <div className="mt-3 text-center">
              <p>
                Already have an account? <a href="/login">Login here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
