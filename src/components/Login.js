import "./Login.css";
import { auth, provider } from "../firebase";
import { Button } from "@material-ui/core";

export default function Login() {
  function login() {
    auth.signInWithRedirect(provider);
  }
  return (
    <div className="app">
      <div className="login">
        <div className="login__container">
          <img src="./login-logo.png" alt="logo" />
          <div className="login__text">
            <h1>Sign in Kasel-Chat-App</h1>
          </div>
          <Button className="button" onClick={login}>
            Sign in With Google
          </Button>
        </div>
      </div>
    </div>
  );
}
