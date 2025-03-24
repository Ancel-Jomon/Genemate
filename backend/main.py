import base64
import os
from pathlib import Path
import re
from flask_socketio import SocketIO
import cv2
from flask import Flask

import numpy as np
from automate_accurig import run_accurig
from body_keypoint_track import BodyKeypointTrack
from bone import bone
from meshroom_CLI import meshmain



app=Flask(__name__)
# CORS(app)
socketio = SocketIO(app,cors_allowed_origins="*")
stop_stream=False


@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    global stop_stream
    stop_stream=True
    print('Client disconnected')

@socketio.on('run_rig')
def handle_rig():
    print('rig')
    run_accurig()

@socketio.on('run_meshroom')
def runmeshroom(path):
    # fixed_path =str(Path(path))
    # print(fixed_path)
    print(path)
    
    meshmain(path)

@socketio.on('video_frame')
def handle_video_frame(data):
    # Decode base64 image from frontend

    # base64_data = data.split(',')[1]
    
    # # Decode base64 string to image
    img_bytes = base64.b64decode(data)
    img_array = np.frombuffer(img_bytes, dtype=np.uint8)
    frame = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    # width = data['width']
    # height = data['height']
    # pixels = np.array(data['data'], dtype=np.uint8).reshape(height, width, 4)
    # frame = cv2.cvtColor(pixels, cv2.COLOR_RGBA2BGR)  
    print("received")
    # Process frame
    process_frame(frame,socketio)

@socketio.on('video_source')
def handle_video_frame(data):
    global stop_stream
   
    if data=="stop":
        stop_stream=True
    else:
        if  stop_stream:
            stop_stream=False
        get_frames(data)


def get_frames(data):
      INPUT_FILE = "C:\\Users\\codec\\Downloads\\pannimark.mp4"

      global stop_stream,socketio
      if data=="camera":
        cap = cv2.VideoCapture(0)
      elif data=="file":
          cap = cv2.VideoCapture(INPUT_FILE)
      fps = cap.get(cv2.CAP_PROP_FPS)
      cap.set(cv2.CAP_PROP_FPS,60)
      while cap.isOpened() and not stop_stream :
       
        ret, frame = cap.read()
        if not ret:
            break
        
        process_frame(frame,socketio)
        _, buffer = cv2.imencode('.jpg', frame)
        processed_data = base64.b64encode(buffer).decode('utf-8')
        socketio.emit('frame_processed', f'data:image/jpeg;base64,{processed_data}')
        

      cap.release()
      cv2.destroyAllWindows()

frame_t= 1.0
frame_rate = 60
objectpresent=False
body_keypoint_track=None

def process_frame(frame,socketio):
       
        global frame_rate,frame_t,objectpresent,body_keypoint_track
        INPUT_IMAGE_SIZE = (360, 640)
        frame = cv2.resize(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB), INPUT_IMAGE_SIZE)

        
        if not objectpresent:
            frame_height, frame_width = frame.shape[:2]
            body_keypoint_track = BodyKeypointTrack(
            im_width=frame_width,
            im_height=frame_height,
            fov=np.pi / 3,
            track_hands=False,
            smooth_range=10 * (1 / frame_rate),
            smooth_range_barycenter=30 * (1 / frame_rate),
            frame_rate=frame_rate)
            objectpresent=True
        seconds=frame_t/frame_rate
        body_keypoint_track.track(frame,seconds)
        
        kpts3d, visib = body_keypoint_track.get_smoothed_3d_keypoints(seconds)
        kpts3d[:, 1] =-( kpts3d[:, 1])
        kpts3d[:, 2] =-( kpts3d[:, 2])
        frame_t +=1.0 

        socketio.emit('keypoints_vector',bone(kpts3d))



if __name__=="__main__":
   
    socketio.run(app, debug=True)
    
    



