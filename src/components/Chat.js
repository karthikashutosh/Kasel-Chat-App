import React from "react";

import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import {
  AddPhotoAlternate,
  ArrowBack,
  MoreVert,
  Send,
} from "@material-ui/icons";
import { useHistory, useParams } from "react-router";
import useRoom from "../hooks/useRoom";
import "./Chat.css";
import ChatMessages from "./ChatMessages";
import MediaPreview from "./MediaPreview";
import ChatFooter from "./ChatFooter";
import Compressor from "compressorjs";
import { v4 as uuid } from "uuid";
import { db, createTimeStamp, storage, createTimestamp } from "../firebase";

export default function Chat({ user, page }) {
  const [image, setImage] = React.useState(null);
  const [src, setSrc] = React.useState("");
  const [input, setInput] = React.useState("");

  const { roomId } = useParams();
  const history = useHistory();
  const room = useRoom(roomId, user.uid);

  function onChange(e) {
    setInput(e.target.value);
  }

  async function sendMessage(e) {
    e.preventDefault();

    if (input.trim() || (input === "" && image)) {
      setInput("");
      if (image) {
        closePreview();
      }

      const imageName = uuid();
      const newMessage = image
        ? {
            name: user.displayName,
            message: input,
            uid: user.uid,
            timestamp: createTimestamp(),
            time: new Date().toUTCString(),
            imageName,
          }
        : {
            name: user.displayName,
            message: input,
            uid: user.uid,
            timestamp: createTimestamp(),
            time: new Date().toUTCString(),
          };
      db.collection("users")
        .doc(user.uid)
        .collection("chats")
        .doc(roomId)
        .set({
          name: room.name,
          photoURL: room.photoURL || null,
          time: createTimeStamp(),
        });

      const doc = await db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add(newMessage);

      if (image) {
        new Compressor(image, {
          qualitylity: 0.8,
          maxWidth: 1920,
          async success(result) {
            setSrc("");
            setImage(null);
            await storage.child(imageName).put(result);
            const url = await storage.child(imageName).getDownloadURL();
            db.collection("rooms")
              .doc(roomId)
              .collection("messages")
              .doc(doc.id)
              .update({
                imageUrl: url,
              });
          },
        });
      }
    }
  }

  function openPreview(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSrc(reader.result);
      };
    }
  }

  function closePreview() {
    setSrc("");
    setImage(null);
  }

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
            onChange={openPreview}
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
      <MediaPreview src={src} closePreview={closePreview} />
      <ChatFooter
        input={input}
        onChange={onChange}
        sendMessage={sendMessage}
        image={image}
        user={user}
        room={room}
        roomId={roomId}
      />
    </div>
  );
}
