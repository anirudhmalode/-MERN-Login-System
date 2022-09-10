import React, { useCallback, useEffect } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {

  const navigate = useNavigate();

  const showAboutPage = useCallback(async() => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: "include"
      })
  
      const data = await res.json();

      console.log("DATA IS --->", data);
      if(!data || data.error || !res.status === 200){
        console.log("Error fetching about");
      }
    } catch (error) {
      console.log("Error while about us fetching!");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    showAboutPage();
  }, []);


  return (
    <Fragment>
      <h1>Create UI to show all the info of logged in User</h1>
    </Fragment>
  );
};

export default About;
