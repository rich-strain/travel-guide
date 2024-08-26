let key = document.getElementById('keyStatus').textContent;
console.log('Uploader API Key is: ', key);
// Define Variables For Uploaded Files
let returnedArray = [];
let filePath = '';

const uploader = Uploader({
  apiKey: key,
  maxFileCount: 1,
});

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
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  // Get the values of the form elements
  const title = document.getElementById('title').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const blogContent = document.getElementById('blogContent').value;
  const imageURL = document.getElementById('imageURL').value;
  // Create a new blog object
  const newBlog = { title, city, state, blogContent, imageURL };
  // Pass Blog Object to request api
  const response = await fetch('/api/blogs', {
    method: 'POST',
    body: JSON.stringify(newBlog),
    headers: { 'Content-Type': 'application/json' },
  });
  // Redirect to the home page
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to create blog');
  }
});
