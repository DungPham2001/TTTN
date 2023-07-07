import axios from "axios";
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut, GoogleLogin, LoginFacebook, handleEditProfile};

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError,setLoginValue, setPasswordValue) {
  localStorage.removeItem('name_facebook')
  localStorage.removeItem('image')
  let statusLogin = ""
  let role = ""
  axios.post("http://giangndt428.pythonanywhere.com/api/user/login?username="+ login + "&password="+ password)
  .then((res) => {
    statusLogin = res.data.message;
    role = res.data.data.role
    setError(false);
    setIsLoading(true);
    if (statusLogin == "Success") {
      if( role == "admin"){
        setTimeout(() => {
          localStorage.setItem('id_token', res.data.data.id)
          localStorage.setItem('name_facebook',res.data.data.full_name)
          localStorage.setItem('image',"https://cdn-icons-png.flaticon.com/512/4086/4086679.png")
          setError(null)
          setIsLoading(false)
          localStorage.setItem('is_login',"success")
          dispatch({ type: 'LOGIN_SUCCESS' })
          history.push('/app/dashboard')
        }, 2000);
      }else{
        toast.error('Account is not account admin', {
          position: toast.POSITION.TOP_RIGHT
        });
        setError(null)
        setIsLoading(false)
        setLoginValue("")
        setPasswordValue("")
      }
    } 
  })
  .catch(function(error){
    toast.error('Admin account not existed', {
      position: toast.POSITION.TOP_RIGHT
    });
    setLoginValue("")
    setPasswordValue("")
  })
  
}




function GoogleLogin(dispatch,access_token,history,setIsLoading,setError){
  localStorage.setItem('id_token', access_token)
  setError(null)
  setIsLoading(false)
  dispatch({ type: 'LOGIN_SUCCESS' })
  history.push('/app/dashboard/')
}

function LoginFacebook(dispatch,access_token,name,image,history,setIsLoading,setError){
  localStorage.setItem('id_token', access_token)
  localStorage.setItem('name_facebook', name)
  localStorage.setItem('image', image)
  setError(null)
  setIsLoading(false)
  dispatch({ type: 'LOGIN_SUCCESS' })
  history.push('/app/dashboard/')
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}

function handleEditProfile(dispatch, history,id_admin, fullName, address, phone, gender){
  axios.put("http://giangndt428.pythonanywhere.com/api/user/update_user/8?"+"full_name="+fullName+"&address="+address+"&phone="+phone+"&gender="+gender
  ).then( (res) => {
    if(res.data.message == "Success"){
      dispatch({ type: "SIGN_OUT_SUCCESS" });
      history.push("/login");
    }
  })
}
