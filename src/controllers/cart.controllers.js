import pool from "../db.js";

export const getCarts = async (req, res) => {
  try {
    const userEmail = req.params.userEmail;

    const query = `
        SELECT c.id AS cartID, p.id AS productID, p.img AS productImg, p.description AS productDescription, p.name AS productName, p.price AS productPrice
        FROM cart c
        INNER JOIN products p ON c.productID = p.id
        WHERE c.userEmail = ?
      `;

    const [rows] = await pool.query(query, [userEmail]);

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

export const postCart = async (req, res) => {
  try {
    const { productID, userEmail } = req.body;

    if (!productID || !userEmail) {
      res.status(400).send("Mandatory data missing");
    } else {
      const [rows] = await pool.query(
        `INSERT INTO cart (productID, userEmail) VALUES (?, ?) `,
        [productID, userEmail]
      );

      res.status(202).send(`Product added to cart`);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

export const deleteCart = async (req, res) => {
  const cartId = req.params.cartId;
  try {
    await db.query("DELETE FROM cart WHERE id = $1", [cartId]);
    res.status(200).send({ message: "Cart successfully deleted" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting cart" });
  }
};
