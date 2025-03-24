





import cv2
import numpy as np
from body_keypoint_track import BodyKeypointTrack
from bone import bone


frame_t= 1.0
frame_rate = 30
objectpresent=False
body_keypoint_track=None

def process_frame(frame,socketio):
       
        global frame_rate,frame_t,objectpresent,body_keypoint_track
        INPUT_IMAGE_SIZE = (360, 640)
        frame = cv2.resize(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB), INPUT_IMAGE_SIZE)

        frame_height, frame_width = frame.shape[:2]
        if not objectpresent:
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


def get_frames(data,socketio):
      INPUT_FILE = "C:\\Users\\codec\\Downloads\\pannimark.mp4"

      if data=="camera":
        cap = cv2.VideoCapture(0)
      elif data=="":
          cap = cv2.VideoCapture(INPUT_FILE)
      fps = cap.get(cv2.CAP_PROP_FPS)
      print(fps)
      while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        process_frame(frame,socketio)
        

      cap.release()
      cv2.destroyAllWindows()


        

       
        


