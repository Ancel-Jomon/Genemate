import { io } from "socket.io-client";
import { plotpoint } from "../src/getdata";
// import { plotpoint } from "./getdata";

class VideoStreamer {
  private socket: any;
  private stream: MediaStream | null = null;
  private videoElement: HTMLVideoElement;
  private canvasElement: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;
  private receivedVideoElement: HTMLImageElement;
  private isStreaming: boolean = false;
  private streamInterval: number | null = null;
 
  constructor(serverUrl: string, fps: number = 10) {
    // Set up local video display
    this.videoElement = document.getElementById('localVideo') as HTMLVideoElement;
    if (!this.videoElement) {
      this.videoElement = document.createElement('video');
      this.videoElement.id = 'localVideo';
      this.videoElement.autoplay = true;
      document.body.appendChild(this.videoElement);
    }
    
    // Set up canvas for capturing frames
    this.canvasElement = document.createElement('canvas');
    this.canvasContext = this.canvasElement.getContext('2d', { willReadFrequently: true })!;
   
    
    // Set up received video display
    this.receivedVideoElement = document.getElementById('receivedVideo') as HTMLImageElement;
    if (!this.receivedVideoElement) {
      this.receivedVideoElement = document.createElement('img');
      this.receivedVideoElement.id = 'receivedVideo';
      document.body.appendChild(this.receivedVideoElement);
    }
    
    // Connect to Socket.IO server
    this.socket = io(serverUrl,{transports:['websocket']});
    
    // Set up Socket.IO event listeners
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });
    
    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.stopStream();
    });
    
    // Handle received frames from server
    this.socket.on('keypoints_vector', (frameData: string) => {
      plotpoint(frameData)
      // console.log(frameData)
    });
    this.socket.on('frame-processed', (data: string ) => {
      // plotpoint(frameData)
      // console.log(frameData)
      this.receivedVideoElement.src=data
    });
    
    // Calculate stream interval based on desired FPS
    this.streamInterval = fps > 0 ? Math.floor(1000 / fps) : 100;
  }
  
  public async startStream(constraints: MediaStreamConstraints = { video: true }) {
    try {
      // Request camera access
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      // Connect stream to video element
      // this.videoElement.src = "absolutecinema.mp4";
      // this.videoElement.load()
      this.videoElement.srcObject=this.stream
      // Configure canvas when video metadata is loaded
      this.videoElement.onloadedmetadata = () => {
        // Set canvas dimensions to match video
        this.canvasElement.width = this.videoElement.videoWidth;
        this.canvasElement.height = this.videoElement.videoHeight;
        
        // Start streaming once dimensions are set
        this.isStreaming = true;
        this.streamFrames();
      };
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  }
  
  private streamFrames() {
    if (!this.isStreaming) return;
    
    const captureAndSend = () => {
      // Draw current video frame to canvas
      this.canvasContext.drawImage(
        this.videoElement, 
        0, 0, 
        this.canvasElement.width, 
        this.canvasElement.height
      );
      
      // // Get frame as JPEG data URL (quality 0.5 for better performance)
      const frameData = this.canvasElement.toDataURL('image/jpeg', .5);
      // console.log("trying")
      // // Send frame to server
      const base64Data = frameData.split(',')[1]; 
      this.socket.emit('video_frame', base64Data);
      // const imageData = this.canvasContext.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
      // this.socket.emit('video_frame_raw', {
      //   width: this.canvasElement.width,
      //   height: this.canvasElement.height,
      //   data: Array.from(imageData.data)
      // });
      
      // Continue streaming if active
      if (this.isStreaming) {
        setTimeout(captureAndSend, this.streamInterval!);
      }
    };
    
    captureAndSend();
  }
  
  public stopStream() {
    this.isStreaming = false;
    
    // Stop all video tracks
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    
    // Clean up video element
    this.videoElement.src = "";
    
    // Clear the received video
    this.receivedVideoElement.src = '';
  }
  
  public disconnect() {
    this.stopStream();
    this.socket.disconnect();
  }
  
  // Utility method to adjust streaming quality/performance
  public setQuality(fps: number, quality: number = 0.5) {
    this.streamInterval = fps > 0 ? Math.floor(1000 / fps) : 100;
    // Quality parameter would be used in the toDataURL call in streamFrames
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const streamer = new VideoStreamer('http://127.0.0.1:5000');
  
  // Connect buttons
  document.getElementById('start')?.addEventListener('click', () => {
    streamer.startStream();
  });
  
  document.getElementById('stop')?.addEventListener('click', () => {
    streamer.stopStream();
  });
});

export default VideoStreamer;