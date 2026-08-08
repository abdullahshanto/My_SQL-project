const { dbPromise } = require("../config/db");
const colors = require("colors");

const getDonors = async (req, res) => {
  try {
    const db = await dbPromise;
    const [rows] = await db.query("SELECT * FROM donors ORDER BY id DESC");

    if (!rows || rows.length === 0) {
      return res.status(404).send({ success: false, message: "no record found" });
    }

    res.status(200).send({ success: true, message: "record found", totalLength: rows.length, data: rows });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "error fetching donor records", error: err.message });
  }
};

const getDonorByID = async (req, res) => {
  try {
    const donorID = req.params.id;
    if (!donorID) return res.status(400).send({ success: false, message: "invalid id" });

    const db = await dbPromise;
    const [rows] = await db.query("SELECT * FROM donors WHERE id = ?", [donorID]);
    if (!rows || rows.length === 0) return res.status(404).send({ success: false, message: "no record found" });

    res.status(200).send({ success: true, message: "donor found", donor_details: rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "internal error", error: error.message });
  }
};

const createTable = async (req, res) => {
  try {
    const db = await dbPromise;
    await db.query(`
      CREATE TABLE IF NOT EXISTS donors (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        amount DECIMAL(10,2) DEFAULT 0.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("table has been created".bgGreen.white);
    return res.status(200).send({ success: true, message: "table created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "cant create table", error: error.message });
  }
};

const insertDonor = async (req, res) => {
  try {
    const { name, email, amount } = req.body;
    if (!name || !email) return res.status(400).send({ success: false, message: "name and email are required" });

    const donationAmount = amount !== undefined && amount !== null && amount !== "" ? parseFloat(amount) : 0;

    const db = await dbPromise;
    const [result] = await db.query(
      "INSERT INTO donors (name, email, amount) VALUES (?, ?, ?)",
      [name.trim(), email.trim(), donationAmount]
    );

    console.log("inserted values into table".bgGreen.white);
    return res.status(201).send({ success: true, message: "Data inserted successfully", insertedId: result.insertId });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "cant insert data into table", error: error.message });
  }
};

const showTables = async (req, res) => {
  try {
    const db = await dbPromise;
    const [data] = await db.query("SHOW TABLES");
    if (!data || data.length === 0) return res.status(404).send({ success: false, message: "no table found" });
    return res
      .status(200)
      .send({ success: true, message: "Data fetched successfully", totalLength: data.length, data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "can't fetch data", error: error.message });
  }
};

const dropTable = async (req, res) => {
  try {
    const db = await dbPromise;
    await db.query("DROP TABLE IF EXISTS donors");
    return res.status(200).send({ success: true, message: "table dropped successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "cant drop table", error: error.message });
  }
};

const updateDonor = async (req, res) => {
  try {
    const id = req.params.id || req.body.id;
    const { name, email, amount } = req.body;
    if (!id) return res.status(400).send({ success: false, message: "id is required for updating" });

    const db = await dbPromise;
    const [rows] = await db.query("SELECT * FROM donors WHERE id = ?", [id]);
    const existing = rows && rows[0];
    if (!existing) return res.status(404).send({ success: false, message: "no record found" });

    const nextName = (name && name.trim()) || existing.name;
    const nextEmail = (email && email.trim()) || existing.email;
    const nextAmount =
      amount !== undefined && amount !== null && amount !== "" ? parseFloat(amount) : existing.amount;

    await db.query("UPDATE donors SET name = ?, email = ?, amount = ? WHERE id = ?", [
      nextName,
      nextEmail,
      nextAmount,
      id,
    ]);

    return res.status(200).send({ success: true, message: "Data updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "cant update data", error: error.message });
  }
};

const deleteDonor = async (req, res) => {
  try {
    const donorID = req.params.id;
    if (!donorID) return res.status(400).send({ success: false, message: "id is required" });

    const db = await dbPromise;
    const [result] = await db.query("DELETE FROM donors WHERE id = ?", [donorID]);
    if (!result || result.affectedRows === 0)
      return res.status(404).send({ success: false, message: "no record found" });

    return res.status(200).send({ success: true, message: "Data deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "cant delete data", error: error.message });
  }
};

module.exports = {
  getDonors,
  getDonorByID,
  createTable,
  insertDonor,
  showTables,
  dropTable,
  updateDonor,
  deleteDonor,
};
