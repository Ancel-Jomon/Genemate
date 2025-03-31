import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:5000", { transports: ["websocket"] });
export { socket };

document.addEventListener("DOMContentLoaded", () => {


    socket.on("connect", () => {
        console.log("Connected to server");
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from server");

        socket.disconnect();

    });

    document.getElementById("rig")?.addEventListener("click", () => {
        console.log("rig")
        const textbox = document.getElementById("rigpath") as HTMLInputElement;
        const rigpath = textbox.value;
        window.location.href = "/static/animation.html";
        socket.emit("run_rig",rigpath);
    });

    document.getElementById("animateBtn")?.addEventListener("click", () => {

        window.location.href = "/static/animationpage.html";

    });

    document.getElementById("mesh")?.addEventListener("click", () => {
        console.log("mesh")
        const textbox = document.getElementById("folderName") as HTMLInputElement;
        const folderName = textbox.value;
        window.location.href = "/static/main.html";
        
        socket.emit("run_meshroom", folderName);
    });
});

