# Genemate

Genemate is a project that creates real time animation of a 3D model based on video input. It uses meshroom to create 3D models from input images provided by the user, Accurig is used to rig the model and Three.js provides the environment for animating the model.

## Running

For running the frontend:
1. open the frontend directory
2. run ``` npm install ```
3. then ``` npm run dev ```

For running the backend:
1. open the backend directory
2. install the packages from requirements.txt
3. run the ```main.py``` file

## Animation
- The vite server launches the frontend in localhost://5173 (normally)
- Navigate to the page ```static/js/animationpage.html``` using the browser url
- If using input video:
  1. Enter the file path in the input field
  2. press the file button above
- If using camera:
  1. press the camera button (Requires view of entire body else pose estimation might result in wrong output)


## Model Generation
Genemate uses meshroom to generate models. The bin path to meshroom must be updated in the ```backend/meshroom_CLI.py``` file's meshmain() function. The option to generate 3D model is available in the frontend ui. (Meshroom requires hours to generate a model and requires a large amount of input images).

## Accurig
Accurig is used to rig the model. The pixel position of each button is used to automate the process. Accurig can be ran individually to generate a rigged model. The output is generally available in FBX format. (Note Genemate requires the model format to be in glb).

## FBX to GLb
The model needs to be in GLb format to be animated. The model in glb format should be placed in ``` frontend/assets```. The Github repo [FBX2GLB-Batch-Convert-Optimizer](https://github.com/crazyramirez/FBX2GLB-Batch-Convert-Optimizer) can be used to convert fbx to glb.


## Sample of Animation


https://github.com/user-attachments/assets/9714db53-365a-48b1-87d9-3c41793b2bec


