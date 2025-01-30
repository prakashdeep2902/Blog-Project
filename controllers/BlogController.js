import blog from "../models/Blog.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/images"));
  },
  filename: function (req, file, cb) {
    const fileName = `NewImage-${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// Render the add blog form
async function addBlog(req, res) {
  try {
    res.render("addBlog");
  } catch (error) {
    console.error("Error rendering addBlog page:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function handleAddBlog(req, res) {
  try {
    const { title, description } = req.body;
    const Blog = await blog.create({
      title,
      description,
      coverImage: `/images/${req.file.filename}`,
      createdBy: req.user._id,
    });

    res.redirect("/");
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).render("addBlog", {
      error: "Internal Server Error. Please try again later.",
    });
  }
}

async function getDetailsOfBlog(req, res) {
  try {
    const id = req.params.id;
    const BlogDetails = await blog.findById(id).populate("createdBy");
    const users = req.user;

    res.render("blog", {
      user: users,
      BlogDetails: BlogDetails,
    });
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).render("addBlog", {
      error: "Internal Server Error. Please try again later.",
    });
  }
}

async function HandelCommentS(req, res) {
  try {
    const id = req.params.id;
    const { comment } = req.body;
    console.log(req.user);
    if (!id || !comment) {
      return res
        .status(400)
        .json({ success: false, error: "Missing blog ID or comment" });
    }

    const dataWithcomment = await blog.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            comment: comment,
            createBy: req.user._id,
            createByName: req.user.name,
          },
        },
      },
      { new: true }
    );

    console.log(dataWithcomment);

    res.redirect(`/blog/page/${id}`);
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error. Please try again later.",
    });
  }
}

export { addBlog, handleAddBlog, upload, getDetailsOfBlog, HandelCommentS };
