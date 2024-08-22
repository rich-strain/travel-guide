// Get the submit button element
const submitNewBlog = document.getElementById('submitNewBlogBtn');

// Get the cancel button element
const cancelNewBlog = document.getElementById('cancelBtn');

cancelNewBLog.addEventListener('click', (event) => {
  // Prevent Default Behavior
  event.preventDefault();
  // Redirect to the home page
  document.location.replace('/');
});

const handleNewBlog = async (event) => {
  // Prevent Default Behavior
  event.preventDefault();

  // Get the values from the form
  const city = document.getElementById('city').value.trim();
  const state = document.getElementById('state').value.trim();
  const postContent = document.getElementById('blogContent').value.trim();
  const imageURL = document.getElementById('imageURL').value.trim();
};

submitNewBlog.addEventListener('click', handleNewBlog);
