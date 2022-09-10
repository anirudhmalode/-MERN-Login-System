import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const userInfoSchema = {
  EMAIL: "email",
  PASSWORD: "password",
};

const Login = () => {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (key, updatedValue) =>
    setUserLogin({
      ...userLogin,
      [key]: updatedValue,
    });

  const handleLoginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLogin)
      });
  
      const data = await res.json();
  
      if(!!data.error || !data){
        console.log("Error Login!")
      }else{
        console.log("User Logged In!");
        navigate('/');
      }
    } catch (error) {
      console.log("Error Login!");
    }
  }

  return (
    <Box
      sx={{
        m: 5,
        p: 2,
        width: 500,
        border: "1px solid grey",
      }}
    >
      <form method="POST" className="row g-3">
        <div className="col-md-12">
          <label className="col-form-label-sm">
            Email
          </label>
          <input
            type="email"
            className="form-control form-control-sm"
            id="inputEmail4"
            value={userLogin.email}
            onChange={(e) =>
              handleInputChange(userInfoSchema.EMAIL, e.target.value)
            }
          />
        </div>

        <div className="col-md-12">
          <label className="col-form-label-sm">
            Password
          </label>
          <input
            type="password"
            className="form-control form-control-sm"
            id="inputPassword4"
            value={userLogin.password}
            onChange={(e) =>
              handleInputChange(userInfoSchema.PASSWORD, e.target.value)
            }
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary" onClick={handleLoginUser}>
            Log in
          </button>
        </div>
      </form>
    </Box>
  );
};

export default Login;
