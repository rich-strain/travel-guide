// Define Variables For Uploaded Files
let returnedArray = [];
let filePath = '';
// Create an instance of the Uploader class
const uploader = Uploader({ apiKey: 'public_FW25cAyGj3zNGY8Y7kCfkqsTd3iS', maxFileCount: 1 });

// Get Elements By ID
const imageURL = document.getElementById('imageURL');
const form = document.getElementById('newBlog');

const uploadButton = document.getElementById('uploaderBtn');
const submitNewBlog = document.getElementById('submitNewBlogBtn');
const cancelNewBlog = document.getElementById('cancelBtn');

// Detect Image Upload Button Click
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

// Detect Cancel Button Click
cancelNewBlog.addEventListener('click', (event) => {
  event.preventDefault();
  // Redirect to the home page
  document.location.replace('/');
});

// Detect Submit Button Click, Call handleNewBlog Function
form.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('New Blog Submitted!');
});
