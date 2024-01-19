import pool from "./db.js";
import data from "./data.js";

const chargeData = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");

    if (rows.length !== 0) {
      console.log(`The products already exist`);
    } else {
      data.map(async (i) => {
        let img = i.img;
        let name = i.name;
        let price = i.price;
        let description = i.description;
        let year = i.year;
        let time = i.time;

        const [rows] = await pool.query(
          `INSERT INTO products (img,  name, price, description, year, time) VALUES (?, ?, ?, ?, ?, ?) `,
          [img, name, price, description, year, time]
        );
      });

      console.log(`Successfully created products`);
    }
  } catch (error) {
    console.log("Internal Server Error:" + error);
  }
};

export default chargeData;
