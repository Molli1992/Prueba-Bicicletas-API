import pool from "../db.js";

export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    res.status(202).json(rows);
  } catch (error) {
    res.status(404).send("Internal Server Error:" + error);
  }
};

export const postProducts = async (req, res) => {
  try {
    const { img, name, price, description, year, time } = req.body;

    if (!img || !name || !price || !description || !year || !time) {
      res.status(404).send("Mandatory data missing");
    } else {
      const [existingProducts] = await pool.query(
        "SELECT * FROM products WHERE name = ?",
        [name]
      );

      if (existingProducts.length > 0) {
        res.status(409).send("There is already a product with the same name");
      } else {
        const [rows] = await pool.query(
          `INSERT INTO products (img,  name, price, description, year, time) VALUES (?, ?, ?, ?, ?, ?) `,
          [img, name, price, description, year, time]
        );

        res.status(202).send(`Successfully created product`);
      }
    }
  } catch (error) {
    res.status(404).send("Internal Server Error:" + error);
  }
};
