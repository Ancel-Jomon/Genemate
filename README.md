# Genemate

Genemate is a project that creates real time animation of a 3D model based on video input. It uses meshroom to create 3D models from input images provided by the user, Accurig is used to rig the model and Three.js provides the environment for animating the model.

## Running

For running the frontend:
1. open the frontend directory
2. run ``` npm install ```
3. then ``` npm run dev ```

For running the backend:
1. open the backend directory
2. run the ```main.py``` file

## Animation
- The vite server launches the frontend in localhost://5173 (normally)
- Navigate to the page "" using the browser url
- If using input video:
  1. Enter the file path in the input field
  2. press the file button above
- If uisng camera:
  1. press the camera button (Requires view of entire body else pose estimation might result in wrong output)
