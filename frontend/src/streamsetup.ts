import { Socket } from "socket.io-client";
import { plotpoint } from "./getdata";
import { DefaultEventsMap } from "@socket.io/component-emitter";
// import { plotpoint } from "./getdata";

class VideoStreamer {
  private socket: any;

  private receivedVideoElement: HTMLImageElement;

  constructor(socket: Socket<DefaultEventsMap, DefaultEventsMap>) {
    this.receivedVideoElement = document.getElementById(
      "receivedVideo"
    ) as HTMLImageElement;
    if (!this.receivedVideoElement) {
      this.receivedVideoElement = document.createElement("img");
      this.receivedVideoElement.id = "receivedVideo";
      // document.body.appendChild(this.receivedVideoElement);
    }

    // Connect to Socket.IO server
    this.socket = socket

    


    // Handle received frames from server
    this.socket.on("keypoints_vector", (frameData: string) => {
      plotpoint(frameData);
      //   console.log(frameData)
    });
    this.socket.on("frame_processed", (data: string) => {
      this.receivedVideoElement.src = data;
    });
  }

  public startStream() {
    console.log("file")
    this.socket.emit("video_source", "file");
  }
  public stopStream() {
    console.log("stop")
    this.socket.emit("video_source", "stop");
    this.receivedVideoElement.src = "";
  }

 
}



export default VideoStreamer;
