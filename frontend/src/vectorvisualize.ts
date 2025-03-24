import * as THREE from "three";


const origin = new THREE.Vector3(1, 0, 0)
const direction = new THREE.Vector3(
    0,1,0)
export const arrowHelper1 = new THREE.ArrowHelper(
    direction.normalize(),
    origin,
    direction.length(),
    0xff0000,  // Red color
    0.2,       // Head length
    0.1        // Head width
);
export const arrowHelper2 = new THREE.ArrowHelper(
    direction.normalize(),
    new THREE.Vector3(2,0,0),
    direction.length(),
    0xff0000,  // Red color
    0.2,       // Head length
    0.1        // Head width
);
export function drawline(newn: (number | undefined)[],arrowHelper:THREE.ArrowHelper,name:string){
    // Define the points for the line
    // newVector[0].multiplyScalar(10)
    const direction = new THREE.Vector3(
        0,1,0)
    const newVector=new THREE.Vector3(newn[0],newn[1],newn[2])
    // console.log(newVector)
    newVector.multiplyScalar(2)
    // console.log(newVector,name)
    const length = newVector.length();
        direction.copy(newVector);
        
        arrowHelper.setDirection(direction.normalize());
        arrowHelper.setLength(length, 0.2, 0.1);

}