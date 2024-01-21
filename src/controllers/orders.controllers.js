import pool from "../db.js";

export const getOrders = async (res) => {
  try {
    const query = `
    SELECT o.id AS orderId, o.status, p.id AS productId, p.*, u.id AS userId, u.* 
    FROM orders o 
    JOIN products p ON o.productID = p.id 
    JOIN users u ON o.userEmail = u.email;
      `;
    const [rows] = await pool.query(query);
    res.status(202).json(rows);
  } catch (error) {
    res.status(404).send("Internal Server Error: " + error.message);
  }
};

export const updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  const newStatus = 0;

  try {
    const updateQuery = "UPDATE orders SET status = ? WHERE id = ?";
    const [updateResult] = await pool.query(updateQuery, [newStatus, orderId]);

    if (updateResult.affectedRows === 0) {
      res.status(404).send("Order not found with id " + orderId);
    } else {
      const query = `
    SELECT o.id AS orderId, o.status, p.id AS productId, p.*, u.id AS userId, u.* 
    FROM orders o 
    JOIN products p ON o.productID = p.id 
    JOIN users u ON o.userEmail = u.email;
      `;
      const [rows] = await pool.query(query);
      res.status(202).json(rows);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

export const postOrders = async (req, res) => {
  try {
    const { productID, userID, status } = req.body;

    if (!productID || !userID) {
      res.status(400).send("Mandatory data missing");
    } else {
      const [rows] = await pool.query(
        `INSERT INTO orders (productID, userID, status) VALUES (?, ?, ?) `,
        [productID, userID, status]
      );

      res.status(202).send(`Purchase made`);
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
};
