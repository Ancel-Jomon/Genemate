import { changenew } from "./animation";


const MEDIAPIPE_POSE_BONES = [
  "leftUpperArm-leftLowerArm",
  "leftUpperLeg-leftLowerLeg",
  "rightUpperArm-rightLowerArm",
  "rightUpperLeg-rightLowerLeg",
  "leftLowerLeg-leftAngle",
  "rightLowerLeg-rightAngle",
  "leftLowerArm-leftWrist",
  "rightLowerArm-rightWrist",
];
export function plotpoint(values: any) {
  for (let i = 0; i < MEDIAPIPE_POSE_BONES.length; i++) {
    var key = MEDIAPIPE_POSE_BONES[i];
    const bones = key.split("-");

    changenew(values[key], bones[0]);
  }


}


