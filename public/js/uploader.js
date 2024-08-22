// Load the Uploader class
//const { Uploader } = require('uploader'); // require causes an error when run from public folder

// Create an instance of the Uploader class
const uploader = Uploader({ apiKey: 'free', maxFileCount: 1 });

// Get the button element
const uploadButton = document.getElementById('uploaderBtn');

// Get imageURL element
const imageURL = document.getElementById('imageURL');

// Define a variable to hold the uploaded files
let returnedArray = [];
let filePath = '';

// Event listener for the upload button
uploadButton.addEventListener('click', (event) => {
  // Prevent Default Behavior
  event.preventDefault();
  // Call the open method on the uploader instance and save the filePath to the uploadedFiles variable
  uploader
    .open({ multi: false })
    .then((files) => {
      if (files.length === 0) {
        console.log('No files selected.');
      } else {
        // Assign the uploaded files to the uploadedFiles variable
        returnedArray = files.map((f) => f.fileUrl);
        filePath = returnedArray[0];
        console.log(filePath);
        // Set the value of the imageURL element to the filePath
        imageURL.value = filePath;
      }
    })
    .catch((err) => {
      console.error(err);
    });
});
