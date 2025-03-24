# def test2():

#     plt.ion()  # Enable interactive mode
#     fig = plt.figure(figsize=(10, 10))
#     ax = fig.add_subplot(111, projection='3d')


#     INPUT_FILE = 'C:\\Users\\ANCEL PUTHOOR\\Downloads\\leftarmfrontmove.mp4'
#     INPUT_IMAGE_SIZE = (360, 640)
#     cap = cv2.VideoCapture(INPUT_FILE)
#     frame_rate = cap.get(cv2.CAP_PROP_FPS)
#     frame_width, frame_height = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
#     kpts3ds = []
    
#     body_keypoint_track = BodyKeypointTrack(
#        im_width=frame_width,
#         im_height=frame_height,
#         fov=np.pi / 3, 
#         track_hands=False, 
#         smooth_range=10 * (1 / frame_rate), 
#         smooth_range_barycenter=30 * (1 / frame_rate), 
#         frame_rate=frame_rate
#     )

#     frame_t = 0.0
#     frame_i = 0
#     while cap.isOpened():
#         ret, frame = cap.read()
#         if not ret:
#             break
#         frame = cv2.resize(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB), INPUT_IMAGE_SIZE)
#         body_keypoint_track.track(frame, frame_t)
#         kpts3d, visib = body_keypoint_track.get_smoothed_3d_keypoints(frame_t)
#         # kpts3ds.append((kpts3d, visib))
#         ax.cla()
        
#         # Plot visible keypoints
#         visible_points = kpts3d[visib == 1]
#         ax.scatter(visible_points[:, 0], visible_points[:, 1], visible_points[:, 2], 
#                   c='red', marker='o', s=50)
#         for i in range(len(visible_points)):
#             ax.text(visible_points[i, 0], visible_points[i, 1], visible_points[i, 2],str(i), fontsize=12, ha='center')
        
      
#         for a, b in MEDIAPIPE_POSE_CONNECTIONS:
#             if visib[a] == 1 and visib[b] == 1:
#                 ax.plot([kpts3d[a, 0], kpts3d[b, 0]],
#                        [kpts3d[a, 1], kpts3d[b, 1]],
#                        [kpts3d[a, 2], kpts3d[b, 2]], c='blue', linewidth=2)
        
#         # Set consistent view and limits
#         ax.view_init(elev=-90, azim=-90)
        
#         # Set labels and title
#         ax.set_xlabel('X')
#         ax.set_ylabel('Y')
#         ax.set_zlabel('Z')
#         ax.set_title(f'Frame {frame_i}')
        
#         # Equal aspect ratio
#         ax.set_box_aspect([1,1,1])
        
       
        
#         # Update display
#         plt.draw()
#         plt.pause(0.001) 
#         frame_t +=1.0 / frame_rate
#         frame_i += 1
#     cap.release()
#     cv2.destroyAllWindows()
#     plt.ioff()  # Disable interactive mode
#     plt.close()

# def init():
#     fig = plt.figure(figsize=(10, 10))
#     ax = fig.add_subplot(111, projection='3d')
#     # plt.ion()


#     INPUT_FILE = 'assets\\leftarmmove.mp4'
#     INPUT_IMAGE_SIZE = (640, 360)
#     cap = cv2.VideoCapture(INPUT_FILE)
#     frame_rate = cap.get(cv2.CAP_PROP_FPS)
#     frame_width, frame_height = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
#     body_keypoint_track = BodyKeypointTrack(
#        im_width=frame_width,
#         im_height=frame_height,
#         fov=np.pi / 3, 
#         track_hands=False, 
#         smooth_range=10 * (1 / frame_rate), 
#         smooth_range_barycenter=30 * (1 / frame_rate), 
#         frame_rate=frame_rate
#     )

#     ax.view_init(elev=-90, azim=90)
        
#         # Set labels and title
#     ax.set_xlabel('X')
#     ax.set_ylabel('Y')
#     ax.set_zlabel('Z')
  
#     ax.set_box_aspect([1,1,1])
#     global frame_i,frame_t
#     frame_t = 0.0
#     frame_i = 0
#     global anim
#     anim=FuncAnimation(fig,Animate,fargs=(body_keypoint_track,cap,frame_rate,ax,INPUT_IMAGE_SIZE),interval=1000/frame_rate)
   
#     plt.show(block=False)
#     writer = FFMpegWriter(
#                 fps=30, 
#                 metadata=dict(artist='Me'),
#                 bitrate=2000
#             )
#     anim.save("videoout\\plotting.mp4",writer=writer)
    
   

# def Animate(frame_i,body_keypoint_track,cap,frame_rate,ax, INPUT_IMAGE_SIZE):
#         global frame_t
#         ret, frame = cap.read()
#         if not ret:
#            return
#         frame = cv2.resize(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB), INPUT_IMAGE_SIZE)
#         body_keypoint_track.track(frame, frame_t)
#         kpts3d, visib = body_keypoint_track.get_smoothed_3d_keypoints(frame_t)
#         # kpts3d[:, 1] =-( kpts3d[:, 1])+1
#         # kpts3d[:, 2] -=1
#         # kpts3ds.append((kpts3d, visib))
#         ax.cla()
        
#         # Plot visible keypoints
#         visible_points = kpts3d[visib == 1]
#         ax.scatter(visible_points[:, 0], visible_points[:, 1], visible_points[:, 2], 
#                   c='red', marker='o', s=50)
        
      
#         for a, b in MEDIAPIPE_POSE_CONNECTIONS:
#             if visib[a] == 1 and visib[b] == 1:
#                 ax.plot([kpts3d[a, 0], kpts3d[b, 0]],
#                        [kpts3d[a, 1], kpts3d[b, 1]],
#                        [kpts3d[a, 2], kpts3d[b, 2]], c='blue', linewidth=2)
        
#         # Set consistent view and limits
#         ax.set_xlabel('X')
#         ax.set_ylabel('Y')
#         ax.set_zlabel('Z')
#         ax.view_init(elev=-90, azim=90)
#         ax.set_title(f'Frame {frame_i}')
        
#         # Equal aspect ratio
#         ax.set_box_aspect([1,1,1])
#         ax.set_title(f'Frame {frame_i}')
#         frame_t +=1.0 / frame_rate
#         frame_i += 1

# # test2()
# # init()
# # printvals()



# class SharedData:
#     def __init__(self):
#         self.kpts3d = None
#         self.visib = None
#         self.lock = threading.Lock()
#         self.data_ready = threading.Event()
#         self.posebones=None

# shared_data=SharedData()


# def printvals():
    
#     INPUT_FILE = "C:\\Users\\alanj\\Downloads\\absolutecinema.mp4"
#     INPUT_IMAGE_SIZE = (360, 640)
#     cap = cv2.VideoCapture(INPUT_FILE)
#     frame_rate = 30
#     frame_width, frame_height = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
#     kpts3ds = []
#     print(frame_height,frame_width)
#     body_keypoint_track = BodyKeypointTrack(
#        im_width=frame_width,
#         im_height=frame_height,
#         fov=np.pi / 3, 
#         track_hands=False, 
#         smooth_range=10 * (1 / frame_rate), 
#         smooth_range_barycenter=30 * (1 / frame_rate), 
#         frame_rate=frame_rate
#     )
#     frame_t = 0.0
#     frame_i = 0
#     while cap.isOpened():
#         ret, frame = cap.read()
#         if not ret:
#             break
#         frame = cv2.resize(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB), INPUT_IMAGE_SIZE)
#         body_keypoint_track.track(frame, frame_t)
        
#         kpts3d, visib = body_keypoint_track.get_smoothed_3d_keypoints(frame_t)
#         kpts3d[:, 1] =-( kpts3d[:, 1])
#         kpts3d[:, 2] =-( kpts3d[:, 2])
        
        

#         frame_t +=1.0 / frame_rate
#         frame_i += 1
#     cap.release()
#     cv2.destroyAllWindows()