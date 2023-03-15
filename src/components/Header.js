import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  // const [tok, setTok] = useState(false);
  // setTok(localStorage.getItem("token"));
  const history = useHistory();
  const tok = localStorage.getItem("token");
  // console.log(tok+"khjk"+localStorage.getItem("token"));

  const backexplore = ()=>{
    history.push("/", {from: "Register"})
  }

  const logout = ()=>{
    localStorage.clear();
    window.location.reload()
    history.push("/login", {from: "Products"})
  }

  const login = ()=>{
    history.push("/login", {from: "Products"})
  }

  const register = ()=>{
    history.push("/register", {from: "Products"})
  }

  return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        { hasHiddenAuthButtons ?
         ( <>
          <Button className="explore-button" startIcon={<ArrowBackIcon />} variant="text" onClick={backexplore}>  Back to explore  </Button>
          </> ) : (tok ? 
          (<span className="span1"><img src="avatar.png" alt={localStorage.getItem("username")}/><span className="span2">{localStorage.getItem("username")}</span>
          <Button  className="explore-button"  variant="text" onClick={logout}> Logout  </Button></span>) : (<span className="span1"><Button className="explore-button" variant="text" onClick={login}> Login  </Button>
        <Button  variant="contained"  onClick={register}> Register  </Button></span>))
        }
      </Box>
    );
};

export default Header;
