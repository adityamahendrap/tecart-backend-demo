import express from "express";
import {
  getBlogsHandler,
  getBlogByIdHandler,
  createBlogHandler,
  updateBlogHandler,
  deleteBlogHandler,
} from "./handler.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/blogs", getBlogsHandler);
app.get("/blogs/:id", getBlogByIdHandler);
app.post("/blogs", createBlogHandler);
app.put("/blogs/:id", updateBlogHandler);
app.delete("/blogs/:id", deleteBlogHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// localhost:3000/blogs/1