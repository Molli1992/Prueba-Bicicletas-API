import pool from "../db.js";

export const getCarts = async (req, res) => {
  try {
    const userID = req.params.userID;

    const query = `
        SELECT c.id AS cartID, p.id AS productID, p.img AS productImg, p.description AS productDescription, p.name AS productName, p.price AS productPrice
        FROM cart c
        INNER JOIN products p ON c.productID = p.id
        WHERE c.userID = ?
      `;

    const [rows] = await pool.query(query, [userID]);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener carritos:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

export const postCart = async (req, res) => {
  try {
    const { productID, userID } = req.body;

    if (!productID || !userID) {
      res.status(400).send("Mandatory data missing");
    } else {
      const [rows] = await pool.query(
        `INSERT INTO cart (productID, userID) VALUES (?, ?) `,
        [productID, userID]
      );

      res.status(202).send(`Product added to cart`);
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
};
