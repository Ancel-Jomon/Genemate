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
        window.location.href = "/static/animation.html";
        socket.emit("run_rig");
    });

    document.getElementById("animateBtn")?.addEventListener("click", () => {

        window.location.href = "/static/animationpage.html";

    });

    document.getElementById("mesh")?.addEventListener("click", () => {
        console.log("mesh")
        window.location.href = "/static/main.html";
        const textbox = document.getElementById("folderName") as HTMLInputElement;
        const folderName = textbox.value;
        socket.emit("run_meshroom", folderName);
    });
});

