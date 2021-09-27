import {
  CancelRounded,
  CheckCircleRounded,
  MicRounded,
  Send,
} from "@material-ui/icons";
import React from "react";
import "./ChatFooter.css";

export default function ChatFooter(
  input,
  onChange,
  sendMessage,
  image,
  user,
  room,
  roomId
) {
  const [isRecording, setIsRecording] = React.useState(false);

  const canRecord = navigator.mediaDevices.getUserMedia && window.MediaRecorder;

  const btnIcons = (
    <>
      <Send style={{ width: 20, height: 20, color: "white" }} />
      <MicRounded style={{ width: 24, height: 20, color: "white" }} />
    </>
  );
  return (
    <div className="chat__footer">
      <form>
        <input
          value={input}
          onChange={!isRecording ? onChange : null}
          placeholder="Type a  message"
        />
        {canRecord ? (
          <button type="submit" className="send__btn">
            {btnIcons}
          </button>
        ) : (
          <>
            <label htmlFor="capture" className="send__btn">
              {btnIcons}
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              id="capture"
              accept="audio/*"
              capture
            />
          </>
        )}
      </form>
      {isRecording && (
        <div className="record">
          <CancelRounded
            style={{
              width: 30,
              height: 30,
              color: "#f20519",
            }}
          />
          <div>
            <div className="record__redcircle"></div>
            <div className="record__duration"></div>
          </div>
          <CheckCircleRounded
            style={{
              width: 30,
              height: 30,
              color: "#f20519",
            }}
          />
        </div>
      )}
    </div>
  );
}
