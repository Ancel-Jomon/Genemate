// document.getElementById("btn").addEventListener("submit", async function (event) {
//     // event.preventDefault(); // Prevent traditional form submission
  
//     // const formData = new FormData();
//     // const folder = document.getElementById("folder").files;
//     
    
//     // if (!folder.length || !folderName) {
//     //     alert("Please select a folder and enter a folder name.");
//     //     return;
//     // }
  
//     // for (let i = 0; i < folder.length; i++) {
//     //     formData.append("image_folder", folder[i]);
//     // }
//     // formData.append("folder_name", folderName);
  
//     try {
//         console.log(folderName)
//         const response = await fetch("/upload", {
//             method: "POST",
//             body: folderName,
//         });
  
//         const result = await response.json();
//         if (result.error) {
//             alert(result.error);
//         } else {
//             alert("3D Model Created!");
//             window.location.href = result.model_path;
//         }
//     } catch (error) {
//         alert("An error occurred while uploading the files.");
//         console.error(error);
//     }
//   });
// document.getElementById('viewModelBtn').addEventListener('click', function() {
//     alert('View 3D Model button clicked!');
// });
document.getElementById('btn').addEventListener('click', async function() {
    const folderName = document.getElementById("folderName").value;
    // console.log(folderName)
    if (!folderName) {
        alert("Please select a folder and enter a folder name.");
        return;
    }
    fetch('http://localhost:5000/upload', {
        method: 'POST', // Specify the request method
        headers: {
            'Content-Type': 'application/json', // Set the content type to plain text
        },
        body:JSON.stringify({ message: folderName }), // Include the string data in the request body
    })
    .then(response => response.json()) // Parse the JSON response
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
});

