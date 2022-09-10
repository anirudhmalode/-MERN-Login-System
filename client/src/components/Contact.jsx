import React, { useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Contact = () => {

  const showContactPage = useCallback(async() => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      const data = await res.json();

      console.log("DATA IS --->", data);
      if(!data || data.error || !res.status === 200){
        console.log("Error fetching contsct");
      }
    } catch (error) {
      console.log("Error while contact us fetching!");
    }
  }, []);

  useEffect(() => {
    showContactPage();
  }, [showContactPage]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        m: 5,
        p: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          Phone
        </Grid>
        <Grid item xs={6}>
          Email
        </Grid>
      </Grid>

      <Box
        sx={{
          m: 5,
          p: 2,
          width: 900,
          border: "1px solid grey",
        }}
      >
        <h5>Get In touch</h5>
        <form className="row g-3">
          <div className="col-md-4">
            <label className="col-form-label-sm">
              Name
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="inputName4"
            />
          </div>

          <div className="col-md-4">
            <label className="col-form-label-sm">
              Email
            </label>
            <input
              type="email"
              className="form-control form-control-sm"
              id="inputEmail4"
            />
          </div>

          <div className="col-md-4">
            <label className="col-form-label-sm">
              Phone
            </label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="inputPhone4"
            />
          </div>

          <div className="col-md-12">
            <label className="col-form-label-sm">
              Message
            </label>
            <textarea
              cols="20"
              rows="10"
              className="form-control form-control-sm"
              id="inputMessage4"
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
                Send Message
            </button>
          </div>
        </form>
      </Box>
    </Box>
  );
};

export default Contact;
