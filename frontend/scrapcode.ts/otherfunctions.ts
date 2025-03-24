// export function orientBoneWithLookAt(
//   bonename: string,
//   targetVector: THREE.Vector3,
//   defaultBoneDirection: THREE.Vector3
// ) {
//   const bone = model.getObjectByName(poseBones[bonename]);

//   const defaultDir = defaultBoneDirection || new THREE.Vector3(0, 1, 0);

//   // Create a position target from direction
//   const targetPosition = new THREE.Vector3()
//     .copy(targetVector)
//     .normalize()
//     .multiplyScalar(1);

//   // Calculate an appropriate up vector that's perpendicular to both the
//   // default direction and target direction
//   const rightVector = new THREE.Vector3()
//     .crossVectors(defaultDir, targetVector)
//     .normalize();
//   const upVector = new THREE.Vector3()
//     .crossVectors(rightVector, targetVector)
//     .normalize();

//   // Create a lookAt matrix
//   const lookAtMatrix = new THREE.Matrix4();
//   lookAtMatrix.lookAt(
//     new THREE.Vector3(0, 0, 0), // Origin
//     targetPosition, // Target
//     upVector // Up vector
//   );

//   // Apply rotation from lookAt matrix
//   const quaternion = new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix);

//   // Store previous rotation for comparison

//     const prevQuaternion = bone.quaternion.clone();
//     const dot = quaternion.dot(prevQuaternion);

//     // If dot product is negative, the rotation is more than 90 degrees
//     if (dot < 0) {
//       quaternion.set(
//         -quaternion.x,
//         -quaternion.y,
//         -quaternion.z,
//         -quaternion.w
//       );
//     }

//   // Apply quaternion
//   bone.quaternion.slerp(quaternion,.4);
//   bone.updateMatrixWorld(true);
// }

// export function orientBoneCorrectly(
//   bonename: string,
//   targetVector: THREE.Vector3
// ) {
//   const bone = model.getObjectByName(poseBones[bonename]);
//   const defaultDir =
//     boneDefaultDirections.get(bone.uuid) || new THREE.Vector3(0, 1, 0);
//   orientBoneWithLookAt(bonename, targetVector, defaultDir);
// }

// function orientBoneWithoutFlips(
//   bonename: string,
//   targetVector: THREE.Vector3,
//   defaultBoneDirection: THREE.Vector3Like
// ) {
//   // Step 1: Allow custom default direction per bone (important!)
//   const defaultDir = defaultBoneDirection || new THREE.Vector3(0, 1, 0);

//   const bone = model.getObjectByName(poseBones[bonename]);

//   // Step 2: Normalize the target vector
//   const direction = targetVector.clone().normalize();

//   // Step 3: Transform to bone's local space if needed
//   let localDirection = direction.clone();
//   if (bone.parent && bone.parent.isBone) {
//     const parentWorldInverse = new THREE.Matrix4()
//       .copy(bone.parent.matrixWorld)
//       .invert();
//     parentWorldInverse.extractRotation(parentWorldInverse); // Keep only rotation
//     localDirection.applyMatrix4(parentWorldInverse);
//   }

//   // Step 4: Store previous rotation for comparison
//   const prevRotation = bone.quaternion.clone();

//   // Step 5: Calculate new quaternion
//   const quaternion = new THREE.Quaternion();

//   // Step 6: Calculate rotation using different method to avoid flips
//   // Method A: Use lookAt with up vector control
//   const lookAtMatrix = new THREE.Matrix4();
//   const upVector = new THREE.Vector3(0, 0, 1); // Try different up vectors if needed

//   lookAtMatrix.lookAt(
//     new THREE.Vector3(0, 0, 0), // Bone origin
//     localDirection, // Target direction
//     upVector // Up vector to stabilize rotation
//   );

//   quaternion.setFromRotationMatrix(lookAtMatrix);

//   // Step 7: Check if this would cause a large rotation from previous state

//   const dot = quaternion.dot(prevRotation);

//   // If dot product is negative, the rotation is more than 90 degrees
//   if (dot < 0) {
//     // Option 1: Use the negated quaternion (this often works)
//     quaternion.set(-quaternion.x, -quaternion.y, -quaternion.z, -quaternion.w);

//     // Option 2: If still problematic, try SLERP with smaller steps
//     // const steps = 10;
//     // bone.quaternion.copy(prevRotation);
//     // for (let i = 1; i <= steps; i++) {
//     //   bone.quaternion.slerpQuaternions(prevRotation, quaternion, i/steps);
//     // }
//     // return; // Skip the next line if using this approach
//   }

//   // Step 8: Apply the quaternion
//   bone.quaternion.copy(quaternion);

//   // Step 9: Update matrices
//   bone.updateMatrixWorld(true);
// }

// export function change(target: any[], parent: string, child: string) {
//     //   const axesHelper = new THREE.AxesHelper(1);
//     // console.log(parent,child)
//     const parentBone = model.getObjectByName(poseBones[parent]);
//     const childBone = model.getObjectByName(poseBones[child]);
//     console.log(parentBone, childBone);

//     //   leftUpperArm.add(axesHelper);
//     //   leftLowerArm.add(axesHelper)

//     //   let localDirection = new THREE.Vector3();

//     let targetDirection = new THREE.Vector3(target[0], target[1], target[2]);

//     //   targetDirection.normalize();
//     //   targetDirection.multiplyScalar(-1)

//     // let current3=localDirection.subVectors(current2,current1)
//     //   let current = getBoneVector(leftUpperArm);
//     //

//     //   drawline([localDirection2.x, localDirection2.y, localDirection2.z], arrowHelper1, "ddiff");
//     if (parent == "rightUpperArm" && child == "rightLowerArm") {
//       drawline(
//         [targetDirection.x, targetDirection.y, targetDirection.z],
//         arrowHelper2,
//         "original"
//       );
//     }
//     // console.log("before", localDirection2);

//     //

//     let rotationq = new THREE.Quaternion();
//     //   const angleToRotate = 0;

//     var rotationAxis,
//       angleToRotate = 0;

//     let localDirection2 = new THREE.Vector3();
//     let localDirection3 = new THREE.Vector3();
//     let current = new THREE.Vector3();
//     parentBone.getWorldPosition(localDirection2);
//     childBone.getWorldPosition(localDirection3);
//     current.subVectors(localDirection3, localDirection2);

//     current.normalize();
//     angleToRotate = current.angleTo(targetDirection);
//     //   rotationq.setFromUnitVectors(current, targetDirection);

//     // console.log(rotationq)
//     var prev = boneRotationHistory.getLastRotation(parentBone);
//     var prevDirection;
//     if (prev == null) {
//       prevDirection = targetDirection;
//       // angle=angleToRotate

//       // boneRotationHistory.addRotation(leftUpperArm, current);

//       // boneRotationHistory.addRotation(parentBone, targetDirection);

//       rotationAxis = new THREE.Vector3()
//         .crossVectors(current, targetDirection)
//         .normalize();

//       // console.log(angleToRotate,rotationAxis)

//       //   console.log(rotationAxis,angleToRotate);
//     }
//     //   else if (angleToRotate > 0.1) {
//     //     prevDirection = prev.targetDirection;

//     //       rotationAxis = new THREE.Vector3()
//     //         .crossVectors(current, targetDirection)
//     //         .normalize();
//     //   }
//     else {
//       prevDirection = prev.targetDirection;
//       //    angle=prev.angle
//       current = prevDirection;

//       rotationAxis = new THREE.Vector3()
//         .crossVectors(current, targetDirection)
//         .normalize();
//       angleToRotate = current.angleTo(targetDirection);
//     }

//     //   //     // rotationq.conjugate()

//     if (prev == null || !areVectorsEqual(prevDirection, targetDirection)) {
//       // console.log(axis,targetDirection)
//       // quat.multiply(rotationq)
//       //  console.log("inside")
//       // console.log(angleToRotate);
//       rotationq.setFromAxisAngle(rotationAxis, angleToRotate);
//       rotationq.normalize();
//       parentBone.quaternion.premultiply(rotationq);
//       parentBone.quaternion.normalize();
//       parentBone.updateMatrix();
//       childBone.updateMatrix();
//       childBone.updateMatrixWorld(true);

//       parentBone.updateMatrixWorld(true);
//     }
//     boneRotationHistory.addRotation(parentBone, targetDirection);
//     //   console.log("after",localDirection1.clone().applyQuaternion(leftUpperArm.quaternion).normalize())
//   }

//   function areVectorsEqual(
//     vec1: THREE.Vector3,
//     vec2: THREE.Vector3,
//     epsilon = 0.001
//   ) {
//     return (
//       Math.abs(vec1.x - vec2.x) < epsilon &&
//       Math.abs(vec1.y - vec2.y) < epsilon &&
//       Math.abs(vec1.z - vec2.z) < epsilon
//     );
//   }

// const boneDefaultDirections = new Map();

// // Determine the actual default direction of each bone in your skeleton
// function determineDefaultDirections(skeleton: {
//   pose: () => void;
//   bones: any[];
// }) {
//   // Reset the skeleton to its bind pose first
//   skeleton.pose();

//   skeleton.bones.forEach((bone) => {
//     // Create a local-to-world direction
//     const worldDir = new THREE.Vector3(0, 1, 0).applyMatrix4(bone.matrixWorld);

//     // Store this direction
//     boneDefaultDirections.set(bone.uuid, worldDir);
//     // if (bone.name == "CC_Base_R_Calf") {
//     //   drawline([worldDir.x, worldDir.y, worldDir.z], arrowHelper2, "original");
//     // }
//     // You can also visualize this with arrows for debugging
//     // const arrow = new THREE.ArrowHelper(worldDir, bone.getWorldPosition(new THREE.Vector3()), 1, 0xff0000);
//     // scene.add(arrow);
//   });
// }

// resultQuat.setFromUnitVectors(new THREE.Vector3(0,1,0),normalizedDirection)
// resultQuat.multiplyQuaternions(new THREE.Quaternion(0,0,1,0),resultQuat)
// resultQuat.multiplyQuaternions(resultQuat,new THREE.Quaternion(0,-1,0,0))
// resultQuat.invert()




// var isAnimating = true;
// function callapi() {
//   fetch("http://127.0.0.1:5000/")
//     .then((response) => response.json())
//     .then((data) => plotpoint(data))
//     .catch((error) => console.error("Error:", error));
// }



//index.html
// const supportLink = document.getElementById("supportLink");
    // const supportPopup = document.getElementById("supportPopup");

    // supportLink.addEventListener("click", function(event) {
    //   event.preventDefault();
    //   supportPopup.style.display = supportPopup.style.display === "block" ? "none" : "block";
    // });

    // document.addEventListener("click", function(event) {
    //   if (!supportLink.contains(event.target) && !supportPopup.contains(event.target)) {
    //     supportPopup.style.display = "none";
    //   }
    // });

    // document.getElementById('btn').addEventListener('click', async function() {
    //   const folderName = document.getElementById("folderName").value;
    //   if (!folderName) {
    //       alert("Please select a folder and enter a folder name.");
    //       return;
    //   }

    //   fetch('http://localhost:5000/upload', {
    //       method: 'POST', 
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ message: folderName }),
    //   }).catch(error => console.error('Error:', error));

    //   window.location.href = 'main.html';
    // });


//main.html
    // document.getElementById('rigModelBtn').addEventListener('click', () => {
    //     const folderInput = document.getElementById('folderInput');
    //     if (!folderInput.files.length) {
    //         alert('Please select a folder.');
    //         return;
    //     }
    //     window.location.href = 'animation.html';
    //   });