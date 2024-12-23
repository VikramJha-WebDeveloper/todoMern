import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");

    const collectData = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:8000/login", {
            method: "post",
            body: JSON.stringify({email, password}),
            headers: {"Content-Type":"application/json"},
            credentials: "include"
        });
        const result = await response.json();
        if(result.message){
            navigate("/home");
            window.location.reload();
            toast.success(result.message);
            setUserName(result.userName)
        }else{
          toast.error(result.errMessage);
        }
    }
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5">
              <div className="card-header text-center">
                <h4>Login to Your Account</h4>
              </div>
              <div className="card-body">
                <form onSubmit={collectData} method="POST">
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

                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                </form>
                <div className="mt-3 text-center">
                  <p>
                    Don't have an account?{" "}
                    <a href="/registration">Register here</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
