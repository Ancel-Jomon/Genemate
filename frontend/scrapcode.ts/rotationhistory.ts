import * as THREE from "three";
export class Rotationhistory{
    bonehistory: Map<any, any>;
    maxHistory: number;
    
    constructor(){
        this.bonehistory=new Map()
        this.maxHistory=10
    }

    getbonehsitory(bone:any){
        // console.log(bone)
        if (!this.bonehistory.has(bone.uuid)) {
            this.bonehistory.set(bone.uuid, {
                history: [],
                bone: bone 
            });
        }
        return this.bonehistory.get(bone.uuid);
    }

    addRotation(bone:any, targetDirection:THREE.Vector3) {
        const boneHistory = this.getbonehsitory(bone);
        const rotationData = {
            targetDirection: targetDirection.clone(),
            // angle: angle,
            timestamp: Date.now()
        };

        boneHistory.history.unshift(rotationData);
        
        // Keep history within size limit
        if (boneHistory.history.length > this.maxHistory) {
            boneHistory.history.pop();
        }
    }
    getLastRotation(bone:any) {
        const boneHistory = this.getbonehsitory(bone);
        return boneHistory.history[0] || null;
    }
    getSecondLastRotation(bone:any) {
        const boneHistory = this.getbonehsitory(bone);
        return boneHistory.history[1] || null;
    }
}