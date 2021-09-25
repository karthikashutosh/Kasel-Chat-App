import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import { AddPhotoAlternate, ArrowBack, MoreVert } from "@material-ui/icons";
import React from "react";
import { useHistory, useParams } from "react-router";
import useRoom from "../hooks/useRoom";
import "./Chat.css";
import ChatMessages from "./ChatMessages";
import MediaPreview from "./MediaPreview";
import ChatFooter from "./ChatFooter";

export default function Chat({ user, page }) {
  const { roomId } = useParams();
  const history = useHistory();
  const room = useRoom(roomId, user.uid);

  return (
    <div className="chat">
      <div style={{ height: page.height }} className="chat__background" />

      <div className="chat__header">
        {page.isMobile && (
          <IconButton onClick={history.goBack}>
            <ArrowBack />
          </IconButton>
        )}

        <div className="avatar__container">
          <Avatar src={room?.photoURL} />
        </div>
        <div className="chat__header--info">
          <h3 style={{ width: page.isMobile && page.width - 165 }}>
            {room?.name}
          </h3>
        </div>
        <div className="chat__header--right">
          <input
            id="image"
            style={{ display: "none" }}
            accept="image/*"
            type="file"
          />
          <IconButton>
            <label htmlFor="image" style={{ cursor: "pointer", height: 24 }}>
              <AddPhotoAlternate />
            </label>
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
          <Menu id="menu" keepMounted>
            <MenuItem>Delete Room</MenuItem>
          </Menu>
        </div>
      </div>

      <div className="chat__body--container">
        <div className="chat__body" style={{ heightheight: page.height - 68 }}>
          <ChatMessages />
        </div>
      </div>
      {/* <MediaPreview /> */}
      <ChatFooter />
    </div>
  );
}
