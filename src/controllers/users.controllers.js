import pool from "../db.js";

export const getUserByEmailAndPassword = async (req, res) => {
  try {
    const email = req.params.email;
    const password = req.params.password;

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).send("User not found");
    }

    const user = rows[0];
    if (user.password !== password) {
      return res.status(401).send("Unauthorized: Incorrect password");
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error);
  }
};

export const postUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      res.status(404).send("Mandatory data missing");
    } else {
      const [existingProducts] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (existingProducts.length > 0) {
        res.status(409).send("There is already a user with the same email");
      } else {
        const [rows] = await pool.query(
          `INSERT INTO users (email, name, password) VALUES (?, ?, ?) `,
          [email, name, password]
        );

        res.status(202).send(`Successfully register user`);
      }
    }
  } catch (error) {
    res.status(404).send("Internal Server Error:" + error);
  }
};
