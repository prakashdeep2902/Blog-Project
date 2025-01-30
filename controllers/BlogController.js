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

export { addBlog, handleAddBlog, upload };
