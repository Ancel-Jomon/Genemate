import numpy as np

def bone(kpts3d):
    dict1={}
    i=0
    for k in MEDIAPIPE_POSE_BONES:
        a,b=MEDIAPIPE_POSE_BONES_POINTS[i]
        result=kpts3d[b]-kpts3d[a]
        result=result/np.linalg.norm(result)
        result=result.tolist()
        dict1.update({k:result})
        i+=1
    return dict1

MEDIAPIPE_POSE_BONES=["leftUpperArm-leftLowerArm",
                      "leftUpperLeg-leftLowerLeg",
                      "rightUpperArm-rightLowerArm",
                      "rightUpperLeg-rightLowerLeg",
                      "leftLowerLeg-leftAngle",
                      "rightLowerLeg-rightAngle",
                      "leftLowerArm-leftWrist",
                      "rightLowerArm-rightWrist"]

MEDIAPIPE_POSE_BONES_POINTS=[(11,13),(23,25),(12,14),(24,26),(25,27),(26,28),(13,15),(14,16)]
