import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack, InputAdornment, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Header.css";
import { Search} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { config } from "../App";
import axios from "axios";

const Header = ({children, hasHiddenAuthButtons }) => {
  // const [tok, setTok] = useState(false);
  // setTok(localStorage.getItem("token"));
  // console.log(hasHiddenAuthButtons)
  const history = useHistory();
  const tok = localStorage.getItem("token");
  // const [search, setSearch] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  // console.log(tok+"khjk"+localStorage.getItem("token"));

  // const performSearch1 = (e)=>{
  //   setSearch(e.target.value);
  //   performSearch(search)
  // }

  // const performSearch = async (e) => {
  //   // console.log(text.target.value);
  //   try{
  //     setSearch(e.target.value);
  //     props.scload(true)
  //     let url = `${config.endpoint}/products/search?value=${e.target.value}`
  //     const data = await axios.get(url);
  //     props.arrprodup(data.data)
  //     props.scload(false)
  //   }
  //   catch(error){
  //     // console.log(error.response)
  //     if(error.response.status == 404){
  //       props.scload(false)
  //       props.arrprodup([])
  //     }
  //     else{
  //       props.scload(false)
  //       enqueueSnackbar(error.response.data.message, {variant: "error"})
  //     }
  //   }
  // };

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
        {children}
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
