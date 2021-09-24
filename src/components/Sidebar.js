import React from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import { auth } from "../firebase";
import { Add, ExitToApp, SearchOutlined } from "@material-ui/icons";

export default function Sidebar({ user, page }) {
  function signOut() {
    auth.signOut();
  }

  return (
    <div
      className="sidebar"
      style={{
        minHeight: page.isMobile ? page.height : "auto",
      }}
    >
      <div className="sidebar__header">
        <div className="sidebar__header--left">
          <Avatar src={user?.photoURL} />
          <h4>{user?.displayName}</h4>
        </div>
        <div className="sidebar__header--right">
          <IconButton onClick={signOut}>
            <ExitToApp />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <form className="sidebar__search--container">
          <SearchOutlined />
          <input
            placeholder="Search for user or Chat rooms"
            type="text"
            id="search"
          ></input>
        </form>
      </div>

      <div className="sidebar__chat--addRoom">
        <IconButton>
          <Add />
        </IconButton>
      </div>
    </div>
  );
}
