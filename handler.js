import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "porto",
});

async function getBlogsHandler(req, res) {
  console.log("getBlogsHandler");

  const [data] = await db.query(
    "SELECT blogs.*, users.name AS user_name FROM blogs JOIN users ON blogs.user_id = users.id"
  );

  res.json({ data, message: "Blogs retrieved successfully" });
}

async function getBlogByIdHandler(req, res) {
  const id = req.params.id;

  let [data] = await db.query(
    `
    SELECT blogs.*, users.name AS user_name FROM blogs 
    JOIN users ON blogs.user_id = users.id
    WHERE blogs.id = ? 
    `,
    [id]
  );
  if (data.length === 0) {
    return res.status(404).json({ data: null, message: "Blog not found" });
  }

  data = data[0];

  res.json({ data, message: "Blog retrieved successfully" });
}

async function createBlogHandler(req, res) {
  const { name, image_link, user_id, category, content } = req.body;

  const [result] = await db.query(
    `INSERT INTO blogs (name, image_link, user_id, category, content) VALUES (?, ?, ?, ?, ?)`,
    [name, image_link, user_id, category, content]
  );

  let [data] = await db.query("SELECT * FROM blogs WHERE id = ?", [
    result.insertId,
  ]);
  if (data.length === 0) {
    return res
      .status(500)
      .json({ data: null, message: "Failed to insert data" });
  }

  data = data[0];

  res.status(201).json({ data: data, message: "Blog created successfully" });
}

async function updateBlogHandler(req, res) {
  const id = req.params.id;
  const { name, image_link, user_id, category, content } = req.body;

  const [result] = await db.query(
    `UPDATE blogs SET name = ?, image_link = ?, user_id = ?, category = ?, content = ? WHERE id = ?`,
    [name, image_link, user_id, category, content, id]
  );

  console.log(result);

  let [data] = await db.query("SELECT * FROM blogs WHERE id = ?", [id]);
  if (data.length === 0) {
    return res
      .status(500)
      .json({ data: null, message: "Something went wrong" });
  }

  res.json({ data: data[0], message: "Blog updated successfully" });
}

async function deleteBlogHandler(req, res) {
  const id = req.params.id;

  const [result] = await db.query(`DELETE FROM blogs WHERE id = ?`, [id]);
  if (result.affectedRows === 0) {
    return res.status(404).json({ data: null, message: "Blog not found" });
  }

  res.json({ data: null, message: "Blog deleted successfully" });
}

export {
  getBlogsHandler,
  getBlogByIdHandler,
  createBlogHandler,
  updateBlogHandler,
  deleteBlogHandler,
};
