import React, { useState } from "react";
import {Grid,CircularProgress,Typography,Button,Tabs,Tab,TextField,Fade,MenuItem} from "@material-ui/core";
import { useHistory, withRouter } from "react-router-dom";
import classnames from "classnames";
import axios from "axios";
// styles
import useStyles from "./styles";
import { useEffect } from "react";

// logo
import google from "../../images/google.svg";
import facebook from "../../images/facebook.svg";
// context
import { useUserDispatch, loginUser, GoogleLogin, LoginFacebook } from "../../context/UserContext";

//login Google
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

//login Facebook

import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import logo from './logo.svg'


function Login(props) {
  var classes = useStyles();
  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var [addressValue, setAddressValue] = useState("");
  var [phoneValue, setPhoneValue] = useState("");
  var [genderValue, setGenderValue] = useState("");

  const listGender = [
    {
      value: 'Men',
      label: 'Men'
    },
    {
      value: 'Women',
      label: 'Women'
    }
  ]
  
  const [status, setStatus] = useState(false)
  const [accessToken, setAccessToken] = useState("");
  const [accessTokenFacebook, setAccessTokenFacebook] = useState(null);
  const [profile, setProfile] = useState(null)

  
  const SignInGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => ((setStatus(true), setAccessToken(codeResponse.access_token) )),
    onError: (error) => console.log('Login Failed:', error)
  });



  return (

    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
      </div>
      <ToastContainer />
      <div className={classes.formContainer}>
        <div className={classes.form}>
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Welcome Movix
              </Typography>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    className={classes.buttonLogin}
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() =>
                      loginUser(userDispatch,loginValue,passwordValue,props.history,setIsLoading,setError, setLoginValue, setPasswordValue)
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>

                )}
              </div>

              {status ?
              <Button size="large" className={classes.googleButton} onClick={() => GoogleLogin(userDispatch,accessToken,props.history,setIsLoading,setError)}>
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
              :
              <Button size="large" className={classes.googleButton} onClick={() => SignInGoogle()}>
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
              }

              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              
              <LoginSocialFacebook appId="775097740638001"
              onResolve={(response) => {
                setProfile(response.data)
              }}
              onReject={(response) =>{
                console.log(response)

              }}
              >
              {profile == null && 
              <Button size="large" className={classes.googleButton}>
                <img src={facebook} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Facebook
              </Button>
              }
              </LoginSocialFacebook>
              {profile && 
              <Button size="large" className={classes.googleButton}>
                <img src={facebook} alt="google" className={classes.googleIcon} onClick={() => LoginFacebook(userDispatch,profile.accessToken,profile.name,profile.picture.data.url,props.history,setIsLoading,setError)} />
                &nbsp;Sign in with Facebook
              </Button>
              }
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :
                </Typography>
              </Fade>
            </React.Fragment>
          
        </div>
      </div>
    </Grid>

  );
}

export default withRouter(Login);
