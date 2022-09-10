import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

const userInfoSchema = {
  NAME: "name",
  EMAIL: "email",
  PHONE: "phone",
  WORK: "work",
  PASSWORD: "password",
  CPASSWORD: "cpassword",
};

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: 0,
    work: "",
    password: "",
    cpassword: "",
  });

  const handleInputChange = (key, updatedValue) =>
    setUser({
      ...user,
      [key]: updatedValue,
    });

  const postUserData = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if (!!data.error || res.status === 422 || !data) {
        console.log("Registration Failed!");
      } else {
        console.log("Registration Successful!");
        navigate("/login");
      }
    } catch (error) {
      console.log("Registration Successful!", error);
      navigate("/login");
    }
  };

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
          <label className="col-form-label-sm">Name</label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="inputName4"
            value={user.name}
            onChange={(e) =>
              handleInputChange(userInfoSchema.NAME, e.target.value)
            }
          />
        </div>

        <div className="col-md-12">
          <label className="col-form-label-sm">Email</label>
          <input
            type="email"
            className="form-control form-control-sm"
            id="inputEmail4"
            value={user.email}
            onChange={(e) =>
              handleInputChange(userInfoSchema.EMAIL, e.target.value)
            }
          />
        </div>

        <div className="col-md-12">
          <label className="col-form-label-sm">Phone</label>
          <input
            type="number"
            className="form-control form-control-sm"
            id="inputPhone4"
            value={user.phone}
            onChange={(e) =>
              handleInputChange(userInfoSchema.PHONE, parseInt(e.target.value))
            }
          />
        </div>

        <div className="col-md-12">
          <label className="col-form-label-sm">Profession</label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="inputProfession4"
            value={user.work}
            onChange={(e) =>
              handleInputChange(userInfoSchema.WORK, e.target.value)
            }
          />
        </div>

        <div className="col-md-12">
          <label className="col-form-label-sm">Password</label>
          <input
            type="password"
            className="form-control form-control-sm"
            id="inputPassword4"
            value={user.password}
            onChange={(e) =>
              handleInputChange(userInfoSchema.PASSWORD, e.target.value)
            }
          />
        </div>

        <div className="col-md-12">
          <label className="col-form-label-sm">Confirm Password</label>
          <input
            type="password"
            className="form-control form-control-sm"
            id="inputCPassword4"
            value={user.cpassword}
            onChange={(e) =>
              handleInputChange(userInfoSchema.CPASSWORD, e.target.value)
            }
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={postUserData}
          >
            Register
          </button>
        </div>
      </form>
    </Box>
  );
};

export default Signup;
