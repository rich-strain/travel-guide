const router = require('express').Router();
const { Blogs, Destination } = require('../../models');
const withAuth = require('../../utils/auth');
//const setBytescaleAPI = require('../../utils/bytescale');

// all endpoints use the /api/blogs path

// Creaate New Blog/Destination
router.post('/', async (req, res) => {
  // console.log('Req Body: ', req.body);
  res.json(req.body);
  // destructure req.body to get the individual properties
  const { title, city, state, imageURL, blogContent } = req.body;
  // //console.log('Session Oject: ', req.session);

  try {
    const newDest = await Destination.create({ city: city, state: state });
    //console.log('newDest: ', newDest);
    const newBlog = await Blogs.create({
      title: title,
      post: blogContent,
      image_u_r_l: imageURL,
      date_created: Date.now(),
      user_id: req.session.user_id,
      destination_id: newDest.id,
    });
    //console.log('newBlog: ', newBlog);
    res.status(200);
  } catch (err) {
    console.log('Err: ', err);
    res.status(500).json(err);
  }
});

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogData = await Blogs.findAll({
      include: [{ all: true }],
    });

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a blog by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blogs.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
