// Flag to track whether a request has already been sent
let requestSent = false;

document.getElementById('myButton').addEventListener('click', function () {
    // Send request only if it hasn't been sent yet
    if (!requestSent) {
        document.getElementById('fileInput').click();
    }
});

document.getElementById('fileInput').addEventListener('change', function (event) {
    const fileInput = event.target;
    if (fileInput.files.length > 0 && !requestSent) {
        const file = fileInput.files[0];
        const fileName = file.name;

        // Simulate a file path for display purposes
        const simulatedFilePath = `C:\\Users\\USER PC\\Desktop\\${fileName}`;

        document.getElementById('filePath').innerText = 'Selected file: ' + simulatedFilePath;

        // Set the flag to indicate that a request has been sent
        requestSent = true;

        // Send the simulated file path to the Flask backend
        fetch('http://127.0.0.1:5000/upload-path', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ simulatedFilePath: simulatedFilePath })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                // Optionally, display success message or data to the user
                document.getElementById('filePath').innerText = 'Selected file is ready to use: ' + simulatedFilePath;
            })
            .catch((error) => {
                console.error('Error:', error);
                // Optionally, display error message to the user
                document.getElementById('filePath').innerText = 'Error: ' + error.message;
            });
    }
});


document.getElementById('navigateButton').addEventListener('click',async  function () {
    // Navigate to another page
    await setMode();
    window.location.href = 'main.html';  
});



async function setMode() {

    try {

        const response = await fetch('http://127.0.0.1:5000/set_mode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: "hi" })
        });

        const refresh = await fetch('http://127.0.0.1:5000/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        localStorage.setItem('modeResponse', JSON.stringify(data)); 


    } catch (error) {
        console.error('Error:', error);
    }

}


document.getElementById('delete').addEventListener('click',async  function () {
    try{
        const response = await fetch('http://127.0.0.1:5000/deleteAllFiles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
        
    });
    
    const data = await response.json();
    
    document.getElementById('deleteResponse').innerText = 'All files was deleted';
}catch(error){
    console.error('Error:', error);
}
  
});