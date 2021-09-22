import React from "react";
import "./App.css";
import useWindowSize from "./hooks/useWindowSize";
import Login from "./components/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export default function App() {
  const page = useWindowSize();
  const [user] = useAuthState(auth);

  if (!user) {
    return <Login />;
  }

  console.log({ user });

  return (
    <div className="app" style={{ ...page }}>
      App
    </div>
  );
}
