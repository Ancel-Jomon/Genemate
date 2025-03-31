import { Socket } from "socket.io-client";
import { plotpoint } from "./getdata";
import { DefaultEventsMap } from "@socket.io/component-emitter";
// import { plotpoint } from "./getdata";

class VideoStreamer {
  private socket: any;

  private receivedVideoElement: HTMLImageElement;
  private center: HTMLDivElement;

  constructor(socket: Socket<DefaultEventsMap, DefaultEventsMap>) {
    this.receivedVideoElement = document.getElementById(
      "receivedVideo"
    ) as HTMLImageElement;
    this.center = document.getElementById(
      "center"
    ) as HTMLDivElement;
    if (!this.receivedVideoElement) {
      this.receivedVideoElement = document.createElement("img");
      this.receivedVideoElement.id = "receivedVideo";
      this.center.appendChild(this.receivedVideoElement);
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

  public startStream(option:string) {
    console.log(option)
    var path=""
    if (option=="file"){
      const textbox = document.getElementById("filepath") as HTMLInputElement;
      path = textbox.value;
      path=path.replace("\\","\\\\")
    }
    console.log(path)
    this.socket.emit("video_source", option,path);
  }
  public stopStream() {
    console.log("stop")
    this.socket.emit("video_source", "stop","");
    this.receivedVideoElement.src = "";
  }

 
}



export default VideoStreamer;
