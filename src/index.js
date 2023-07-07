import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import Themes from "./themes";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <GoogleOAuthProvider clientId="735523499833-a3d18pii25raaaec0in4b4f3ojesqotg.apps.googleusercontent.com">
    <BrowserRouter>
      <LayoutProvider>
        <UserProvider>
          <ThemeProvider theme={Themes.default}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </UserProvider>
      </LayoutProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
